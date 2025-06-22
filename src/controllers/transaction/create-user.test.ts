import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { CreateUserController } from "@/controllers/user/create-user.controller";
import { CreateUserDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import { EmailAlreadyExistsError } from "@/errors/user.error";
import { ICreateUserUseCase } from "@/use-cases/user/user.type";

describe("CreateUserController", () => {
  class CreateUserUseCaseStub implements ICreateUserUseCase {
    async execute(data: CreateUserDTO): Promise<UserEntity | null> {
      return {
        ...data,
        id: faker.string.uuid(),
        created_at: new Date(),
      };
    }
  }

  const createSut = () => {
    const useCase = new CreateUserUseCaseStub();
    const controller = new CreateUserController(useCase);
    return { useCase, controller };
  };

  const mockResponse = () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return { res: { status } as unknown as Response, status, json };
  };

  const mockRequest = () => {
    return {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
      },
    } as Request;
  };

  it("should respond with 201 and created user", async () => {
    const req = mockRequest();

    const { res, status, json } = mockResponse();

    const { controller } = createSut();
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should respond with 400 if first_name is not provided", async () => {
    const req = mockRequest();
    req.body.first_name = undefined;

    const { res, status } = mockResponse();

    const { controller } = createSut();
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if last_name is not provided", async () => {
    const req = mockRequest();
    req.body.last_name = undefined;

    const { res, status } = mockResponse();

    const { controller } = createSut();
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if email is not provided", async () => {
    const req = mockRequest();
    req.body.email = undefined;

    const { res, status } = mockResponse();

    const { controller } = createSut();
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if password is not provided", async () => {
    const req = mockRequest();
    req.body.password = undefined;

    const { res, status } = mockResponse();

    const { controller } = createSut();
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if password length is less than 6 characters", async () => {
    const req = mockRequest();
    req.body.password = faker.internet.password({ length: 5 });

    const { res, status } = mockResponse();

    const { controller } = createSut();
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("invalid email format", async () => {
    const req = mockRequest();
    req.body.email = "invalid-email";

    const { res, status } = mockResponse();

    const { controller } = createSut();
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should call CreateUserUseCase with correct data", async () => {
    const req = mockRequest();

    const { res, status, json } = mockResponse();

    const { useCase, controller } = createSut();
    const executeSpy = jest.spyOn(useCase, "execute");

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
    expect(executeSpy).toHaveBeenCalledWith(req.body);
  });

  it("should return 409 if CreateUserUseCase throws EmailAlreadyExistsError", async () => {
    const req = mockRequest();

    const { res, status } = mockResponse();

    const { useCase, controller } = createSut();
    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new EmailAlreadyExistsError();
    });

    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(409);
  });
});
