import { faker } from "@faker-js/faker/locale/pt_BR";
import { Request, Response } from "express";

import { UpdateUserController } from "@/controllers/user/update-user.controller";
import { UpdateUserDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import { EmailAlreadyExistsError } from "@/errors/user.error";
import { IUpdateUserUseCase } from "@/use-cases/user/user.type";

describe("UpdateUserController", () => {
  class UpdateUserUseCaseStub implements IUpdateUserUseCase {
    async execute(data: UpdateUserDTO): Promise<UserEntity | null> {
      return {
        ...data,
        first_name: data.first_name ?? faker.person.firstName(),
        last_name: data.last_name ?? faker.person.lastName(),
        email: data.email ?? faker.internet.email(),
        password: data.password ?? faker.internet.password({ length: 10 }),
        id: data.id ?? faker.string.uuid(),
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
        userId: faker.string.uuid(),
      },
      body: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
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
    const { useCase, controller } = createSut();

    const executeSpy = jest.spyOn(useCase, "execute");
    await controller.execute(req, res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
    expect(executeSpy).toHaveBeenCalledWith({
      id: req.params.userId,
      ...req.body,
    });
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
});
