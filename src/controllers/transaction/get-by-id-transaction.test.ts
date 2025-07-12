import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { GetTransactionByIdController } from "@/controllers/transaction/get-by-id-transaction.controller";
import { TransactionEntity } from "@/entities/transaction.entity";
import { IGetTransactionByIdUseCase } from "@/use-cases/transaction/transaction.type";

describe("GetByIdTransactionController", () => {
  const transaction: TransactionEntity = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    amount: faker.number.int({ min: 1, max: 1000 }),
    type: faker.helpers.arrayElement(["EARNING", "EXPENSE", "INVESTMENT"]),
    date: faker.date.anytime(),
    created_at: faker.date.past(),
  };

  class GetTransactionByIdUseCaseStub implements IGetTransactionByIdUseCase {
    async execute(): Promise<TransactionEntity | null> {
      return transaction;
    }
  }
  const createSut = () => {
    const useCase = new GetTransactionByIdUseCaseStub();
    const controller = new GetTransactionByIdController(useCase);
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

  const mockRequest = () => {
    return {
      params: {
        transactionId: transaction.id,
      },
    } as Partial<Request> as Request;
  };

  it("should return 400 when transactionId param is invalid", async () => {
    const req = mockRequest();
    req.params.transactionId = "invalid_transaction_id";
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 404 when transaction is not found", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockResolvedValueOnce(null);

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should return 200 with transaction when transaction is found", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(transaction);
  });

  it("should return 500 when an error occurs", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
