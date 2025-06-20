import { UpdateUserController } from "@/controllers/user/update-user.controller";
import { UserPostgresRepository } from "@/repositories/user.repository";
import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";

export const makeUpdateUserController = (): UpdateUserController => {
  const repo = new UserPostgresRepository();
  const useCase = new UpdateUserUseCase(repo);
  return new UpdateUserController(useCase);
};
