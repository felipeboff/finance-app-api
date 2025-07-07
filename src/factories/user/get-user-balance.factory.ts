import { GetUserBalanceController } from "@/controllers/user/get-user-balance.controller";
import { db } from "@/db";
import { UserPostgresRepository } from "@/repositories/user.repository";
import { GetUserBalanceUseCase } from "@/use-cases/user/get-user-balance.usecase";

export const makeGetUserBalanceController = (): GetUserBalanceController => {
  const repo = new UserPostgresRepository(db);
  const useCase = new GetUserBalanceUseCase(repo);
  return new GetUserBalanceController(useCase);
};
