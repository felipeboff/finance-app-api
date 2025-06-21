import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { CreateUserController } from "@/controllers/user/create-user.controller";
import { CreateUserDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import { ICreateUserUseCase } from "@/use-cases/user/user.type";

const mockResponse = () => {
  const json = jest.fn();
  const status = jest.fn(() => ({ json }));
  return { res: { status } as unknown as Response, status, json };
};

describe("CreateUserController", () => {
  class CreateUserUseCaseStub implements ICreateUserUseCase {
    async execute(data: CreateUserDTO): Promise<UserEntity> {
      return {
        ...data,
        id: faker.string.uuid(),
        created_at: new Date(),
      };
    }
  }

  it("should respond with 201 and created user", async () => {
    const req = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
      },
    } as Request;

    const { res, status, json } = mockResponse();

    const controller = new CreateUserController(new CreateUserUseCaseStub());
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it("should respond with 400 if first_name is not provided", async () => {
    const req = {
      body: {
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
      },
    } as Request;

    const { res, status } = mockResponse();

    const controller = new CreateUserController(new CreateUserUseCaseStub());
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if last_name is not provided", async () => {
    const req = {
      body: {
        first_name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
      },
    } as Request;

    const { res, status } = mockResponse();

    const controller = new CreateUserController(new CreateUserUseCaseStub());
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if email is not provided", async () => {
    const req = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        password: faker.internet.password({ length: 10 }),
      },
    } as Request;

    const { res, status } = mockResponse();

    const controller = new CreateUserController(new CreateUserUseCaseStub());
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if password is not provided", async () => {
    const req = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
      },
    } as Request;

    const { res, status } = mockResponse();

    const controller = new CreateUserController(new CreateUserUseCaseStub());
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("should respond with 400 if password length is less than 6 characters", async () => {
    const req = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 5 }),
      },
    } as Request;

    const { res, status } = mockResponse();

    const controller = new CreateUserController(new CreateUserUseCaseStub());
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });

  it("invalid email format", async () => {
    const req = {
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: "invalid-email",
        password: faker.internet.password({ length: 10 }),
      },
    } as Request;

    const { res, status } = mockResponse();

    const controller = new CreateUserController(new CreateUserUseCaseStub());
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(400);
  });
});
