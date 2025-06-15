import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { DeleteUserController } from "@/controllers/user/delete-user.controller";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user.usecase";
import { query } from "@/db/postgres";

export const makeDeleteUserController = (): DeleteUserController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new DeleteUserUseCase(repo);
  return new DeleteUserController(useCase);
};
