import { DeleteUserController } from "@/controllers/user/delete-user.controller";
import { db } from "@/db";
import { UserPostgresRepository } from "@/repositories/user.repository";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user.usecase";

export const makeDeleteUserController = (): DeleteUserController => {
  const repo = new UserPostgresRepository(db);
  const useCase = new DeleteUserUseCase(repo);
  return new DeleteUserController(useCase);
};
