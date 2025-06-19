import { TransactionNotFoundError } from "@/errors/transaction.error";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";

export class DeleteTransactionUseCase {
  constructor(
    private readonly transactionRepo = new TransactionsPostgresRepository(),
  ) {}

  async execute(transactionId: string) {
    const transactionExists =
      await this.transactionRepo.findById(transactionId);

    if (!transactionExists) {
      throw new TransactionNotFoundError();
    }

    await this.transactionRepo.delete(transactionId);
  }
}
