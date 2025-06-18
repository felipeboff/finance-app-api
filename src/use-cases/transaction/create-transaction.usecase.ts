import { CreateTransactionDTO } from "@/dtos/transaction.dto";
import { TransactionEntity } from "@/entities/transaction.entity";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";
import { UserPostgresRepository } from "@/repositories/user-postgres.repository";
import { UserNotFoundError } from "@/errors/user-not-found.error";
import { v4 as uuidv4 } from "uuid";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepo = new TransactionsPostgresRepository(),
    private readonly userRepo = new UserPostgresRepository(),
  ) {}

  async execute(input: CreateTransactionDTO) {
    const userFound = await this.userRepo.findById(input.user_id);

    if (!userFound) throw new UserNotFoundError();

    const transaction: TransactionEntity = {
      id: uuidv4(),
      user_id: input.user_id,
      title: input.title,
      date: input.date,
      amount: input.amount,
      type: input.type,
      created_at: new Date(),
    };

    const result = await this.transactionRepo.create(transaction);
    return result;
  }
}
