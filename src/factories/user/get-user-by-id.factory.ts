import { GetUserByIdController } from "@/controllers/user/get-user-by-id.controller";
import { GetUserByIdUseCase } from "@/use-cases/user/get-user-by-id.usecase";
import { UserPostgresRepository } from "@/repositories/user/user-postgres.repository";

export const makeGetUserByIdController = (): GetUserByIdController => {
  const repo = new UserPostgresRepository();
  const useCase = new GetUserByIdUseCase(repo);
  return new GetUserByIdController(useCase);
};
