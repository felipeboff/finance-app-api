import { GetUserByIdController } from "@/controllers/user/get-user-by-id.controller";
import { query } from "@/db/postgres";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { GetUserByIdUseCase } from "@/use-cases/user/get-user-by-id.usecase";

export const makeGetUserByIdController = (): GetUserByIdController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new GetUserByIdUseCase(repo);
  return new GetUserByIdController(useCase);
};
