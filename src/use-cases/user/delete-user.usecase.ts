import { UserNotFoundError } from "@/errors/user.error";
import { IUserRepository } from "@/repositories/types/user.type";
import { IDeleteUserUseCase } from "@/use-cases/user/user.type";

export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    const userExists = await this.userRepo.findById(userId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    await this.userRepo.delete(userId);
  }
}
