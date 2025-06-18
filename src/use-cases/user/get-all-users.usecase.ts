import { UserPostgresRepository } from "@/repositories/user-postgres.repository";

export class GetAllUsersUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}

  async execute() {
    const users = await this.userRepo.findAll();
    return users;
  }
}
