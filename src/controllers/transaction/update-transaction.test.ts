import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { UpdateTransactionController } from "@/controllers/transaction/update-transaction.controller";
import { TransactionType, UpdateTransactionDTO } from "@/dtos/transaction.dto";
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
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    } as Partial<Response> as Response;
    return res;
  };

  const mockRequest = (): Request => {
    const type = faker.helpers.arrayElement([
      TransactionType.EARNING,
      TransactionType.EXPENSE,
      TransactionType.INVESTMENT,
    ]);

    const body: UpdateTransactionDTO = {
      amount: faker.number.int({ min: 1, max: 1000 }),
      title: faker.lorem.sentence(),
      date: new Date(),
      type,
    };

    return {
      params: {
        transactionId: transactionFaker.id,
      },
      body,
    } as Partial<Request> as Request;
  };

  it("should respond with 200 and updated transaction", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    const executeSpy = jest.spyOn(useCase, "execute");
    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
    expect(executeSpy).toHaveBeenCalledWith(req.params.transactionId, req.body);
  });

  it("should respond with 400 when transactionId is invalid", async () => {
    const req = mockRequest();
    req.params.transactionId = "invalid-uuid";
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid transaction ID",
    });
  });

  it("should respond with 404 when transaction not found", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockResolvedValue(null);
    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 404 when use case throws TransactionNotFoundError", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new TransactionNotFoundError();
    });

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should return 500 when use case throws unexpected error", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
