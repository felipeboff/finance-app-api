import { GetUserByIdRepository } from "@/repositories/postgres/get-user-by-id";

export class GetUserByIdUseCase {
  async execute(userId: string) {
    const getUserByIdRepository = new GetUserByIdRepository();
    const user = await getUserByIdRepository.execute(userId);
    return user;
  }
}
