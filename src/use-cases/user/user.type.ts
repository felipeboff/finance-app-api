import { CreateUserDTO, UpdateUserDTO, UserBalanceDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";

export interface ICreateUserUseCase {
  execute(input: CreateUserDTO): Promise<UserEntity | null>;
}

export interface IGetAllUsersUseCase {
  execute(): Promise<UserEntity[] | null>;
}

export interface IGetUserBalanceUseCase {
  execute(id: string): Promise<UserBalanceDTO | null>;
}

export interface IUpdateUserUseCase {
  execute(userId: string, input: UpdateUserDTO): Promise<UserEntity | null>;
}

export interface IDeleteUserUseCase {
  execute(id: string): Promise<void | null>;
}

export interface IGetUserByIdUseCase {
  execute(id: string): Promise<UserEntity | null>;
}
