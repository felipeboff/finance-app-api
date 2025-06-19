import { UpdateUserDTO } from "@/dtos/user.dto";
import { UserNotFoundError } from "@/errors/user.error";
import { EmailAlreadyExistsError } from "@/errors/user.error";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { hashPassword } from "@/services/hash.service";

export class UpdateUserUseCase {
  constructor(private readonly userRepo = new UserPostgresRepository()) {}
  async execute(input: UpdateUserDTO) {
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new UserNotFoundError();

    if (input.email) {
      const userEmailExists = await this.userRepo.findByEmail(input.email);
      if (userEmailExists && userEmailExists.id !== user.id) {
        throw new EmailAlreadyExistsError();
      }
    }

    const safeUpdateValue: UpdateUserDTO = {
      ...input,
      id: user.id,
      password: input.password
        ? await hashPassword(input.password)
        : user.password,
    };

    return await this.userRepo.update(safeUpdateValue);
  }
}
