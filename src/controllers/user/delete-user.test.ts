import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { DeleteUserController } from "@/controllers/user/delete-user.controller";
import { IDeleteUserUseCase } from "@/use-cases/user/user.type";

describe("DeleteUserController", () => {
  class DeleteUserUseCaseStub implements IDeleteUserUseCase {
    async execute(id: string): Promise<void> {
      console.log(id);
      return;
    }
  }

  const createSut = () => {
    const useCase = new DeleteUserUseCaseStub();
    const controller = new DeleteUserController(useCase);
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

  it("should return 200 if user is deleted", async () => {
    const { controller } = createSut();
    const req = mockRequest();
    const { res, status } = mockResponse();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should return 400 if invalid user id is provided", async () => {
    const { controller } = createSut();
    const req = mockRequest();
    req.params.userId = "invalid-user-id";
    const { res, status } = mockResponse();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });
});
