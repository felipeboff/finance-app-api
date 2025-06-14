import { v4 as uuidv4 } from "uuid";
import { CreateUserDTO } from "@/dtos/create-user.dto";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { UserPostgresRepository } from "@/repositories/user/user-postgres.repository";
import { hashPassword } from "@/services/hash.service";

export class CreateUserUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}

  async execute(input: CreateUserDTO) {
    const exists = await this.userRepo.findByEmail(input.email);
    if (exists) throw new EmailAlreadyExistsError(input.email);

    const user = {
      id: uuidv4(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: await hashPassword(input.password),
    };

    return await this.userRepo.create(user);
  }
}
