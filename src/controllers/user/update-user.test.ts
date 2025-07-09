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
  const userId = faker.string.uuid();
  const user: UpdateUserDTO = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
  };
  class UpdateUserUseCaseStub implements IUpdateUserUseCase {
    async execute(data: UpdateUserDTO): Promise<UserEntity | null> {
      return {
        ...data,
        id: userId,
        first_name: data.first_name ?? user.first_name!,
        last_name: data.last_name ?? user.last_name!,
        email: data.email ?? user.email!,
        password: data.password ?? user.password!,
        created_at: new Date(),
      };
    }
  }

  const createSut = () => {
    const useCase = new UpdateUserUseCaseStub();
    const controller = new UpdateUserController(useCase);
    return { useCase, controller };
  };

  const mockResponse = () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return { res: { status } as unknown as Response, status, json };
  };

  const mockRequest = () => {
    return {
      params: {
        userId,
      },
      body: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
      },
    } as unknown as Request;
  };

  it("should respond with 200 and updated user", async () => {
    const req = mockRequest();
    const { res, status, json } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should respond with 400 if id is not provided", async () => {
    const req = mockRequest();
    req.body.id = undefined;
    const { res, status } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 200 if first_name is not provided", async () => {
    const req = mockRequest();
    req.body.first_name = undefined;
    const { res, status } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should respond with 200 if last_name is not provided", async () => {
    const req = mockRequest();
    req.body.last_name = undefined;
    const { res, status } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should respond with 200 if email is not provided", async () => {
    const req = mockRequest();
    req.body.email = undefined;
    const { res, status } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should respond with 200 if password is not provided", async () => {
    const req = mockRequest();
    req.body.password = undefined;
    const { res, status } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
  });

  it("should respond with 400 if password length is less than 6 characters", async () => {
    const req = mockRequest();
    req.body.password = faker.internet.password({ length: 5 });
    const { res, status } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should call UpdateUserUseCase with correct data", async () => {
    const req = mockRequest();
    const { res, status, json } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should return 409 if UpdateUserUseCase throws EmailAlreadyExistsError", async () => {
    const req = mockRequest();
    const { res, status } = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new EmailAlreadyExistsError();
    });
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(409);
  });

  it("should return 400 when invalid id", async () => {
    const req = mockRequest();
    req.params.userId = "invalid-uuid";
    const { res, status } = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should return 404 if UpdateUserUseCase not found user", async () => {
    const req = mockRequest();
    const { res, status, json } = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockResolvedValueOnce(null);
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      error: "Failed to update user",
    });
  });

  it("should return 404 if UpdateUserUseCase throws UserNotFoundError", async () => {
    const req = mockRequest();
    const { res, status } = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError();
    });
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(404);
  });

  it("should return 500 when use case throws unexpected error", async () => {
    const req = mockRequest();
    const { res, status } = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(500);
  });
});
