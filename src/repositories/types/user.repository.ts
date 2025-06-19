import { CreateUserDTO, UpdateUserDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";

export interface IUserRepository {
  create(user: CreateUserDTO): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(data: UpdateUserDTO): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
}
