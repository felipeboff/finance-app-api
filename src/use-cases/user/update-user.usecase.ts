import { UserPostgresRepository } from "@/repositories/user/user-postgres.repository";
import { UserNotFoundError } from "@/errors/user-not-found.error";
import { UserEntity } from "@/entities/user.entity";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { hashPassword } from "@/services/hash.service";
import { UpdateUserDTO } from "@/dtos/user.dto";

export class UpdateUserUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}
  async execute(input: UpdateUserDTO) {
    const user = await this.userRepo.findById(input.id);
    console.log(user?.last_name);
    if (!user) throw new UserNotFoundError(input.id);

    if (input.email) {
      const userEmailExists = await this.userRepo.findByEmail(input.email);
      if (userEmailExists && userEmailExists.id !== user.id) {
        throw new EmailAlreadyExistsError(input.email);
      }
    }

    const safeUpdateValue: UserEntity = {
      id: user.id,
      first_name: input.first_name ?? user.first_name,
      last_name: input.last_name ?? user.last_name,
      email: input.email ?? user.email,
      password: input.password
        ? await hashPassword(input.password)
        : user.password,
    };

    return await this.userRepo.update(safeUpdateValue);
  }
}
