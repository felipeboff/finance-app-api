import { faker } from "@faker-js/faker/locale/pt_BR";
import { Response } from "express";

import { GetAllTransactionsController } from "@/controllers/transaction/get-all-transactions.controller";
import { TransactionEntity } from "@/entities/transaction.entity";
import { IGetAllTransactionsUseCase } from "@/use-cases/transaction/transaction.type";

describe("GetAllTransactionsController", () => {
  const transactions: TransactionEntity[] = Array.from({ length: 2 }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    date: faker.date.anytime(),
    user_id: faker.string.uuid(),
    amount: faker.number.int({ min: 1, max: 1000 }),
    type: faker.helpers.arrayElement(["EARNING", "EXPENSE", "INVESTMENT"]),
    created_at: faker.date.anytime(),
  }));

  class GetAllTransactionsUseCaseStub implements IGetAllTransactionsUseCase {
    async execute(): Promise<TransactionEntity[]> {
      return transactions;
    }
  }

  const createSut = () => {
    const useCase = new GetAllTransactionsUseCaseStub();
    const controller = new GetAllTransactionsController(useCase);
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

  it("should return 200 with all transactions when use case returns transactions", async () => {
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(transactions);
  });

  it("should return 500 when use case throws error", async () => {
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    await controller.execute(res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
