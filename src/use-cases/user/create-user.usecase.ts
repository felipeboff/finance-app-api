import { v4 as uuidv4 } from "uuid";
import { CreateUserDTO } from "@/dtos/user.dto";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { hashPassword } from "@/services/hash.service";

export class CreateUserUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}

  async execute(input: CreateUserDTO) {
    const exists = await this.userRepo.findByEmail(input.email);
    if (exists) throw new EmailAlreadyExistsError(input.email);

    const user = {
      id: uuidv4(),
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      password: await hashPassword(input.password),
      created_at: new Date(),
    };

    return await this.userRepo.create(user);
  }
}
