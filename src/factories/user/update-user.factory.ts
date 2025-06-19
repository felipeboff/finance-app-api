import { UpdateUserController } from "@/controllers/user/update-user.controller";
import { query } from "@/db/postgres";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";

export const makeUpdateUserController = (): UpdateUserController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new UpdateUserUseCase(repo);
  return new UpdateUserController(useCase);
};
