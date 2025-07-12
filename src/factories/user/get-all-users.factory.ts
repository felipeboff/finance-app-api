import { GetAllUsersController } from "@/controllers/user/get-all-users.controller";
import { db } from "@/db";
import { UserRepository } from "@/repositories/user.repository";
import { GetAllUsersUseCase } from "@/use-cases/user/get-all-users.usecase";

export const makeGetAllUsersController = (): GetAllUsersController => {
  const repo = new UserRepository(db);
  const useCase = new GetAllUsersUseCase(repo);
  return new GetAllUsersController(useCase);
};
