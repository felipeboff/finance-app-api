import { UserBalanceDTO } from "@/dtos/user.dto";
import { IUserRepository } from "@/repositories/types/user.type";
import { IGetUserBalanceUseCase } from "@/use-cases/user/user.type";

export class GetUserBalanceUseCase implements IGetUserBalanceUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<UserBalanceDTO> {
    const user = await this.userRepo.balance(userId);
    return user;
  }
}
