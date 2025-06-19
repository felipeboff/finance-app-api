import { CreateUserController } from "@/controllers/user/create-user.controller";
import { query } from "@/db/postgres";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { CreateUserUseCase } from "@/use-cases/user/create-user.usecase";

export const makeCreateUserController = (): CreateUserController => {
  const repo = new UserPostgresRepository(query);
  const useCase = new CreateUserUseCase(repo);
  return new CreateUserController(useCase);
};
