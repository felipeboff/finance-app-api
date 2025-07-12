import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { CreateTransactionController } from "@/controllers/transaction/create-transaction.controller";
import { CreateTransactionDTO, TransactionType } from "@/dtos/transaction.dto";
import { TransactionEntity } from "@/entities/transaction.entity";
import { UserNotFoundError } from "@/errors/user.error";
import { ICreateTransactionUseCase } from "@/use-cases/transaction/transaction.type";

describe("CreateTransactionController", () => {
  class CreateTransactionUseCaseStub implements ICreateTransactionUseCase {
    async execute(
      data: CreateTransactionDTO,
    ): Promise<TransactionEntity | null> {
      return {
        ...data,
        id: faker.string.uuid(),
        created_at: new Date(),
      };
    }
  }

  const createSut = () => {
    const useCase = new CreateTransactionUseCaseStub();
    const controller = new CreateTransactionController(useCase);
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

    const body: CreateTransactionDTO = {
      user_id: faker.string.uuid(),
      amount: faker.number.int({ min: 1, max: 1000 }),
      title: faker.lorem.sentence(),
      date: new Date(),
      type,
    };

    return { body } as Request;
  };

  it("should return 201 with created transaction when input is valid", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should return 400 when user_id is missing", async () => {
    const req = mockRequest();
    req.body.user_id = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 400 when amount is missing", async () => {
    const req = mockRequest();
    req.body.amount = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 400 when type is invalid", async () => {
    const req = mockRequest();
    req.body.type = "INVALID";
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should call use case with correct data", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    const executeSpy = jest.spyOn(useCase, "execute");
    await controller.execute(req, res);

    expect(executeSpy).toHaveBeenCalledWith(req.body);
  });

  it("should return 400 if use case returns null", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockResolvedValueOnce(null);

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Failed to create transaction" }),
    );
  });

  it("should return 400 if use case throws UserNotFoundError", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError();
    });

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "User not found" }),
    );
  });

  it("should return 500 on unknown error", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error("Unexpected failure");
    });

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
