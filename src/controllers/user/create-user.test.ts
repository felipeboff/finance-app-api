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
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    } as Partial<Response> as Response;
    return res;
  };

  const mockRequest = () => {
    const body: CreateUserDTO = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
    };

    return { body } as Request;
  };

  it("should return 201 with created user when input is valid", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should return 400 when first_name is missing", async () => {
    const req = mockRequest();
    req.body.first_name = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 400 when last_name is missing", async () => {
    const req = mockRequest();
    req.body.last_name = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 400 when email is missing", async () => {
    const req = mockRequest();
    req.body.email = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 400 when password is missing", async () => {
    const req = mockRequest();
    req.body.password = undefined;
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 400 when password is too short", async () => {
    const req = mockRequest();
    req.body.password = faker.internet.password({ length: 5 });
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should return 400 when email is invalid", async () => {
    const req = mockRequest();
    req.body.email = "invalid-email";
    const res = mockResponse();
    const { controller } = createSut();

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("should call use case with correct data when input is valid", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    const executeSpy = jest.spyOn(useCase, "execute");
    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
    expect(executeSpy).toHaveBeenCalledWith(req.body);
  });

  it("should return 409 when email already exists", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new EmailAlreadyExistsError();
    });
    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
  });

  it("should return 500 when use case throws unknown error", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const { useCase, controller } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should return 400 when user creation fails", async () => {
    const req = mockRequest();
    const res = mockResponse();

    const { controller, useCase } = createSut();
    jest.spyOn(useCase, "execute").mockResolvedValueOnce(null);

    await controller.execute(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Failed to create user" }),
    );
  });
});
