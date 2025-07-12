import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { DeleteTransactionController } from "@/controllers/transaction/delete-transaction.controller";
import { TransactionNotFoundError } from "@/errors/transaction.error";
import { IDeleteTransactionUseCase } from "@/use-cases/transaction/transaction.type";

describe("DeleteTransactionController", () => {
  class DeleteTransactionUseCaseStub implements IDeleteTransactionUseCase {
    async execute(id: string): Promise<void> {
      console.log(id);
      return;
    }
  }

  const createSut = () => {
    const useCase = new DeleteTransactionUseCaseStub();
    const controller = new DeleteTransactionController(useCase);
    return { useCase, controller };
  };

  const mockResponse = () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    return {
      res: res as Partial<Response> as Response,
      status: res.status,
      json: res.json,
    };
  };

  const mockRequest = () => {
    return {
      params: {
        transactionId: faker.string.uuid(),
      },
    } as Partial<Request> as Request;
  };

  it("should return 200 when transaction is successfully deleted", async () => {
    const { controller } = createSut();
    const req = mockRequest();
    const { res, status } = mockResponse();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should return 404 when transaction is not found", async () => {
    const { controller, useCase } = createSut();
    const req = mockRequest();
    const { res, status } = mockResponse();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new TransactionNotFoundError();
    });

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(404);
  });

  it("should return 400 when transactionId param is invalid", async () => {
    const { controller } = createSut();
    const req = mockRequest();
    req.params.transactionId = "invalid-transaction-id";
    const { res, status } = mockResponse();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should return 500 when use case throws error", async () => {
    const { res, status } = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    await controller.execute(mockRequest(), res);

    expect(status).toHaveBeenCalledWith(500);
  });
});
