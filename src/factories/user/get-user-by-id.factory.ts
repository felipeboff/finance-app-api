import { GetUserByIdController } from "@/controllers/user/get-user-by-id.controller";
import { GetUserByIdUseCase } from "@/use-cases/user/get-user-by-id.usecase";
import { UserPostgresRepository } from "@/repositories/user/user-postgres.repository";
import { query } from "@/db/postgres";

export const makeGetUserByIdController = (): GetUserByIdController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new GetUserByIdUseCase(repo);
  return new GetUserByIdController(useCase);
};
