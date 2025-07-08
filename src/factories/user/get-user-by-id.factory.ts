import { GetUserByIdController } from "@/controllers/user/get-user-by-id.controller";
import { db } from "@/db";
import { UserRepository } from "@/repositories/user.repository";
import { GetUserByIdUseCase } from "@/use-cases/user/get-user-by-id.usecase";

export const makeGetUserByIdController = (): GetUserByIdController => {
  const repo = new UserRepository(db);
  const useCase = new GetUserByIdUseCase(repo);
  return new GetUserByIdController(useCase);
};
