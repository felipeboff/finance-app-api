import { GetAllUserController } from "@/controllers/user/get-all-user.controller";
import { UserPostgresRepository } from "@/repositories/user.repository";
import { GetAllUsersUseCase } from "@/use-cases/user/get-all-users.usecase";

export const makeGetAllUsersController = (): GetAllUserController => {
  const repo = new UserPostgresRepository();
  const useCase = new GetAllUsersUseCase(repo);
  return new GetAllUserController(useCase);
};
