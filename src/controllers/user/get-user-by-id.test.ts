import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { GetUserByIdController } from "@/controllers/user/get-user-by-id.controller";
import { UserEntity } from "@/entities/user.entity";
import { IGetUserByIdUseCase } from "@/use-cases/user/user.type";

describe("GetUserByIdController", () => {
  const user: UserEntity = {
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: faker.date.past(),
  };

  class GetUserByIdUseCaseStub implements IGetUserByIdUseCase {
    async execute(): Promise<UserEntity | null> {
      return user;
    }
  }

  const createSut = () => {
    const useCase = new GetUserByIdUseCaseStub();
    const controller = new GetUserByIdController(useCase);
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
        userId: user.id,
      },
    } as Partial<Request> as Request;
  };

  it("should return 400 when userId param is invalid", async () => {
    const req = mockRequest();
    req.params.userId = "invalid_user_id";
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 404 when user is not found", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockResolvedValueOnce(null);

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should return 200 with user when user is found", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(user));
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
