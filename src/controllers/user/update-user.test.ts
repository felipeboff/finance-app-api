import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { UpdateUserController } from "@/controllers/user/update-user.controller";
import { UpdateUserDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import {
  EmailAlreadyExistsError,
  UserNotFoundError,
} from "@/errors/user.error";
import { IUpdateUserUseCase } from "@/use-cases/user/user.type";

describe("UpdateUserController", () => {
  const user: UserEntity = {
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    created_at: new Date(),
  };

  class UpdateUserUseCaseStub implements IUpdateUserUseCase {
    async execute(
      userId: string,
      data: UpdateUserDTO,
    ): Promise<UserEntity | null> {
      return {
        ...user,
        ...data,
        id: userId,
      };
    }
  }

  const createSut = () => {
    const useCase = new UpdateUserUseCaseStub();
    const controller = new UpdateUserController(useCase);
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
    const body: UpdateUserDTO = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    };

    return {
      params: {
        userId: user.id,
      },
      body,
    } as Partial<Request> as Request;
  };

  it("should respond with 200 and updated user", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should respond with 400 if userId param is invalid", async () => {
    const req = mockRequest();
    req.params.userId = "invalid-uuid";
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should respond with 200 when first_name is undefined", async () => {
    const req = mockRequest();
    req.body.first_name = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should respond with 200 when last_name is undefined", async () => {
    const req = mockRequest();
    req.body.last_name = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should respond with 200 when email is undefined", async () => {
    const req = mockRequest();
    req.body.email = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should respond with 200 when password is undefined", async () => {
    const req = mockRequest();
    req.body.password = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should respond with 400 when password length is less than 6 characters", async () => {
    const req = mockRequest();
    req.body.password = faker.internet.password({ length: 5 });
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should call UpdateUserUseCase with correct data", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    const executeSpy = jest.spyOn(useCase, "execute");

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
    expect(executeSpy).toHaveBeenCalledWith(req.params.userId, req.body);
  });

  it("should return 409 when UpdateUserUseCase throws EmailAlreadyExistsError", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new EmailAlreadyExistsError();
    });

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  it("should respond with 400 when UpdateUserUseCase returns null", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockResolvedValueOnce(null);

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to update user",
    });
  });

  it("should return 404 when UpdateUserUseCase throws UserNotFoundError", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError();
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
