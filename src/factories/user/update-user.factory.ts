import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";
import { UserPostgresRepository } from "@/repositories/user/user-postgres.repository";
import { UpdateUserController } from "@/controllers/user/update-user.controller";

export const makeUpdateUserController = (): UpdateUserController => {
  const repo = new UserPostgresRepository();
  const useCase = new UpdateUserUseCase(repo);
  return new UpdateUserController(useCase);
};
