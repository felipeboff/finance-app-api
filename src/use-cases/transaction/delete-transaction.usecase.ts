import { TransactionNotFoundError } from "@/errors/transaction.error";
import { ITransactionRepository } from "@/repositories/types/transaction.type";

export class DeleteTransactionUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async execute(transactionId: string) {
    const transactionExists =
      await this.transactionRepo.findById(transactionId);

    if (!transactionExists) {
      throw new TransactionNotFoundError();
    }

    await this.transactionRepo.delete(transactionId);
  }
}
