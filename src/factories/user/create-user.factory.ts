import { CreateUserController } from "@/controllers/user/create-user.controller";
import { UserPostgresRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "@/use-cases/user/create-user.usecase";

export const makeCreateUserController = (): CreateUserController => {
  const repo = new UserPostgresRepository();
  const useCase = new CreateUserUseCase(repo);
  return new CreateUserController(useCase);
};
