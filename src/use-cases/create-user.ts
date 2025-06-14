import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { PostgresCreateUserRepository } from "@/repositories/postgres/create-user";
import { GetUserByEmailRepository } from "@/repositories/postgres/get-user-by-email";
import { EmailAlreadyExistsError } from "@/errors/user";
export type UserInput = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  async execute(input: UserInput) {
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const userGetByEmail = await getUserByEmailRepository.execute(input.email);
    if (userGetByEmail) {
      throw new EmailAlreadyExistsError(input.email);
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = {
      id: userId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
