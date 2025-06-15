import { UserPostgresRepository } from "@/repositories/user-postgres.repository";

export class GetUserByIdUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}

  async execute(userId: string) {
    const user = await this.userRepo.findById(userId);
    return user;
  }
}
