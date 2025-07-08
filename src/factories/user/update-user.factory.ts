import { UpdateUserController } from "@/controllers/user/update-user.controller";
import { db } from "@/db";
import { UserRepository } from "@/repositories/user.repository";
import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";

export const makeUpdateUserController = (): UpdateUserController => {
  const repo = new UserRepository(db);
  const useCase = new UpdateUserUseCase(repo);
  return new UpdateUserController(useCase);
};
