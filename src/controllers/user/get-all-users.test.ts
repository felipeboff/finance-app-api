import { faker } from "@faker-js/faker/locale/pt_BR";
import { Response } from "express";

import { GetAllUserController } from "@/controllers/user/get-all-users.controller";
import { UserEntity } from "@/entities/user.entity";
import { IGetAllUsersUseCase } from "@/use-cases/user/user.type";

describe("GetAllController", () => {
  const users: UserEntity[] = Array.from({ length: 2 }, () => ({
    id: faker.string.uuid(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    created_at: faker.date.anytime(),
  }));

  class GetAllUsersUseCaseStub implements IGetAllUsersUseCase {
    async execute(): Promise<UserEntity[]> {
      return users;
    }
  }

  const createSut = () => {
    const useCase = new GetAllUsersUseCaseStub();
    const controller = new GetAllUserController(useCase);
    return { useCase, controller };
  };

  const mockResponse = () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    return { res: { status } as unknown as Response, status, json };
  };

  it("should return 200 with all users when use case returns users", async () => {
    const { res, status, json } = mockResponse();
    const { controller } = createSut();

    await controller.execute(res);

    expect(status).toHaveBeenCalledWith(200);
    expect(json).toHaveBeenCalledWith(users);
  });

  it("should return 500 when use case throws error", async () => {
    const { res, status } = mockResponse();
    const { controller, useCase } = createSut();

    jest.spyOn(useCase, "execute").mockImplementationOnce(() => {
      throw new Error();
    });

    await controller.execute(res);

    expect(status).toHaveBeenCalledWith(500);
  });
});
