import { CreateUserUseCase } from "@/use-cases/user/create-user.usecase";
import { UserPostgresRepository } from "@/repositories/user/user-postgres.repository";
import { CreateUserController } from "@/controllers/user/create-user.controller";

export const makeCreateUserController = (): CreateUserController => {
  const repo = new UserPostgresRepository();
  const useCase = new CreateUserUseCase(repo);
  return new CreateUserController(useCase);
};
