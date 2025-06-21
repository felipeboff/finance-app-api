import { UserEntity } from "@/entities/user.entity";
import { IUserRepository } from "@/repositories/types/user.type";
import { IGetUserByIdUseCase } from "@/use-cases/user/user.type";

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findById(userId);
    return user;
  }
}
