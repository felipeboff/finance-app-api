import { UpdateTransactionDTO } from "@/dtos/transaction.dto";
import { TransactionNotFoundError } from "@/errors/transaction.error";
import { ITransactionRepository } from "@/repositories/types/transaction.type";

export class UpdateTransactionUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async execute(transactionId: string, input: UpdateTransactionDTO) {
    const transaction = await this.transactionRepo.findById(transactionId);
    if (!transaction) throw new TransactionNotFoundError();

    return await this.transactionRepo.update(input, transactionId);
  }
}
