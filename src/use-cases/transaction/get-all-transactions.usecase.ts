import { ITransactionRepository } from "@/repositories/types/transaction.type";

export class GetAllTransactionsUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async execute() {
    const transactions = await this.transactionRepo.findAll();
    return transactions;
  }
}
