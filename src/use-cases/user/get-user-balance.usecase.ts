import { UserPostgresRepository } from "@/repositories/user-postgres.repository";

export class GetUserBalanceUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}

  async execute(userId: string) {
    const user = await this.userRepo.balance(userId);
    return user;
  }
}
