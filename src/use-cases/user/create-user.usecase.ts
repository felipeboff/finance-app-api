import { v4 as uuidv4 } from "uuid";

import { CreateUserDTO } from "@/dtos/user.dto";
import { EmailAlreadyExistsError } from "@/errors/user.error";
import { IUserRepository } from "@/repositories/types/user.type";
import { hashPassword } from "@/services/hash.service";
import { ICreateUserUseCase } from "@/use-cases/user/user.type";

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(input: CreateUserDTO) {
    const userExists = await this.userRepo.findByEmail(input.email);
    if (userExists) throw new EmailAlreadyExistsError();

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
