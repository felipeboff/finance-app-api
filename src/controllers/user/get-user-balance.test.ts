import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { GetUserBalanceController } from "@/controllers/user/get-user-balance.controller";
import { UserBalanceDTO } from "@/dtos/user.dto";
import { IGetUserBalanceUseCase } from "@/use-cases/user/user.type";

describe("GetUserBalanceController", () => {
  class GetUserBalanceUseCaseStub implements IGetUserBalanceUseCase {
    async execute(id: string): Promise<UserBalanceDTO | null> {
      return {
        user_id: id,
        balance: faker.number.int({ min: 0, max: 1000 }),
        expenses: faker.number.int({ min: 0, max: 1000 }),
        earnings: faker.number.int({ min: 0, max: 1000 }),
        investments: faker.number.int({ min: 0, max: 1000 }),
        expenses_percentage: faker.number.int({ min: 0, max: 100 }),
        earnings_percentage: faker.number.int({ min: 0, max: 100 }),
        investments_percentage: faker.number.int({ min: 0, max: 100 }),
      };
    }
  }

  const createSut = () => {
    const useCase = new GetUserBalanceUseCaseStub();
    const controller = new GetUserBalanceController(useCase);
    return { useCase, controller };
  };

  const mockResponse = () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    return {
      res: res as unknown as Response,
      status: res.status,
      json: res.json,
    };
  };

  const mockRequest = () => {
    return {
      params: {
        userId: faker.string.uuid(),
      },
    } as unknown as Request;
  };

  it("should return 200 if user balance is found", async () => {
    const { controller } = createSut();
    const req = mockRequest();
    const { res, status } = mockResponse();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });
});
