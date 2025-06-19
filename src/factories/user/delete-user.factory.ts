import { DeleteUserController } from "@/controllers/user/delete-user.controller";
import { query } from "@/db/postgres";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user.usecase";

export const makeDeleteUserController = (): DeleteUserController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new DeleteUserUseCase(repo);
  return new DeleteUserController(useCase);
};
