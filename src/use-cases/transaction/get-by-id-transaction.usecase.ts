import { ITransactionRepository } from "@/repositories/types/transaction.type";

export class GetTransactionByIdUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async execute(transactionId: string) {
    const transaction = await this.transactionRepo.findById(transactionId);
    return transaction;
  }
}
