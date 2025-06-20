import { UserPostgresRepository } from "@/repositories/user.repository";

export class GetAllUsersUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}

  async execute() {
    const users = await this.userRepo.findAll();
    return users;
  }
}
