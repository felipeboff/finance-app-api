import { UpdateUserDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import { UserNotFoundError } from "@/errors/user.error";
import { EmailAlreadyExistsError } from "@/errors/user.error";
import { IUserRepository } from "@/repositories/types/user.type";
import { hashPassword } from "@/services/hash.service";
import { IUpdateUserUseCase } from "@/use-cases/user/user.type";

export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(
    userId: string,
    input: UpdateUserDTO,
  ): Promise<UserEntity | null> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new UserNotFoundError();

    if (input.email) {
      const userEmailExists = await this.userRepo.findByEmail(input.email);
      if (userEmailExists && userEmailExists.id !== user.id) {
        throw new EmailAlreadyExistsError();
      }
    }

    const safeUpdateValue: UpdateUserDTO = {
      ...input,
      password: input.password
        ? await hashPassword(input.password)
        : user.password,
    };

    return await this.userRepo.update(safeUpdateValue, userId);
  }
}
