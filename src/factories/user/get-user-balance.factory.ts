import { GetUserBalanceController } from "@/controllers/user/get-user-balance.controller";
import { query } from "@/db/postgres";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { GetUserBalanceUseCase } from "@/use-cases/user/get-user-balance.usecase";

export const makeGetUserBalanceController = (): GetUserBalanceController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new GetUserBalanceUseCase(repo);
  return new GetUserBalanceController(useCase);
};
