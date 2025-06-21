import { UserEntity } from "@/entities/user.entity";
import { IUserRepository } from "@/repositories/types/user.type";
import { IGetAllUsersUseCase } from "@/use-cases/user/user.type";

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepo.findAll();
    return users;
  }
}
