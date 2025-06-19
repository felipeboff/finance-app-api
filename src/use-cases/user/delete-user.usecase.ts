import { UserNotFoundError } from "@/errors/user.error";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";

export class DeleteUserUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}

  async execute(userId: string) {
    const userExists = await this.userRepo.findById(userId);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    await this.userRepo.delete(userId);
  }
}
