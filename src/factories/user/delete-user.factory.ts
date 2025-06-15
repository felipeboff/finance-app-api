import { UserPostgresRepository } from "@/repositories/user/user-postgres.repository";
import { DeleteUserController } from "@/controllers/user/delete-user.controller";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user.usecase";

export const makeDeleteUserController = (): DeleteUserController => {
  const repo = new UserPostgresRepository();
  const useCase = new DeleteUserUseCase(repo);
  return new DeleteUserController(useCase);
};
