import { v4 as uuidv4 } from "uuid";

import { CreateTransactionDTO } from "@/dtos/transaction.dto";
import { UserNotFoundError } from "@/errors/user.error";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepo = new TransactionsPostgresRepository(),
    private readonly userRepo = new UserPostgresRepository(),
  ) {}

  async execute(input: CreateTransactionDTO) {
    const userFound = await this.userRepo.findById(input.user_id);

    if (!userFound) throw new UserNotFoundError();

    const transaction: CreateTransactionDTO = {
      id: uuidv4(),
      user_id: input.user_id,
      title: input.title,
      date: input.date,
      amount: input.amount,
      type: input.type,
    };

    const result = await this.transactionRepo.create(transaction);
    return result;
  }
}
