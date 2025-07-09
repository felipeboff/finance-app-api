import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { DeleteUserController } from "@/controllers/user/delete-user.controller";
import { UserNotFoundError } from "@/errors/user.error";
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
    } as Partial<Request> as Request;
  };

  it("should return 200 when user is successfully deleted", async () => {
    const { controller } = createSut();
    const req = mockRequest();
    const { res, status } = mockResponse();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should return 400 when userId param is invalid", async () => {
    const { controller } = createSut();
    const req = mockRequest();
    req.params.userId = "invalid-user-id";
    const { res, status } = mockResponse();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should return 404 when user is not found", async () => {
    const { controller, useCase } = createSut();
    const req = mockRequest();
    const { res, status } = mockResponse();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError();
    });
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(404);
  });

  it("should return 500 when use case throws unknown error", async () => {
    const { controller, useCase } = createSut();
    const req = mockRequest();
    const { res, status } = mockResponse();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(500);
  });
});
