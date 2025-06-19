import { GetAllUserController } from "@/controllers/user/get-all-user.controller";
import { query } from "@/db/postgres";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { GetAllUsersUseCase } from "@/use-cases/user/get-all-users.usecase";

export const makeGetAllUsersController = (): GetAllUserController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new GetAllUsersUseCase(repo);
  return new GetAllUserController(useCase);
};
