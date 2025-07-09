import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { UpdateTransactionController } from "@/controllers/transaction/update-transaction.controller";
import { UpdateTransactionDTO } from "@/dtos/transaction.dto";
import { TransactionEntity } from "@/entities/transaction.entity";
import { TransactionNotFoundError } from "@/errors/transaction.error";
import { IUpdateTransactionUseCase } from "@/use-cases/transaction/transaction.type";

describe("CreateTransactionController", () => {
  const transactionFaker: TransactionEntity = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    date: new Date(),
    amount: faker.number.int({ min: 1, max: 1000 }),
    type: faker.helpers.arrayElement(["EARNING", "EXPENSE", "INVESTMENT"]),
    created_at: new Date(),
  };

  class UpdateTransactionUseCaseStub implements IUpdateTransactionUseCase {
    async execute(
      transactionId: string,
      input: UpdateTransactionDTO,
    ): Promise<TransactionEntity | null> {
      return {
        ...transactionFaker,
        ...input,
        id: transactionId,
      };
    }
  }

  const createSut = () => {
    const useCase = new UpdateTransactionUseCaseStub();
    const controller = new UpdateTransactionController(useCase);
    return { useCase, controller };
  };

  const mockResponse = () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return { res: { status } as unknown as Response, status, json };
  };

  const mockRequest = (): Request => {
    return {
      params: {
        transactionId: transactionFaker.id,
      },
      body: {
        amount: faker.number.int({ min: 1, max: 1000 }),
        title: faker.lorem.sentence(),
        date: new Date(),
        type: faker.helpers.arrayElement(["EARNING", "EXPENSE", "INVESTMENT"]),
      } as UpdateTransactionDTO,
    } as unknown as Request;
  };

  it("should respond with 200 and updated transaction", async () => {
    const req = mockRequest();
    const { res, status, json } = mockResponse();
    const { controller, useCase } = createSut();

    const executeSpy = jest.spyOn(useCase, "execute");
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
    expect(executeSpy).toHaveBeenCalledWith(req.params.transactionId, req.body);
  });

  it("should respond with 400 when transactionId is invalid", async () => {
    const req = mockRequest();
    req.params.transactionId = "invalid-uuid";
    const { res, status, json } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: "Invalid transaction ID",
    });
  });

  it("should respond with 404 when transaction not found", async () => {
    const req = mockRequest();
    const { res, status } = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockResolvedValue(null);
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should return 404 when use case throws TransactionNotFoundError", async () => {
    const req = mockRequest();
    const { res, status } = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new TransactionNotFoundError();
    });

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(404);
  });

  it("should return 500 when use case throws unexpected error", async () => {
    const req = mockRequest();
    const { res, status } = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(500);
  });
});
