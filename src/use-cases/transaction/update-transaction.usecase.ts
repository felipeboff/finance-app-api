import { UpdateTransactionDTO } from "@/dtos/transaction.dto";
import { TransactionNotFoundError } from "@/errors/transaction.error";
import { ITransactionRepository } from "@/repositories/types/transaction.type";

export class UpdateTransactionUseCase {
  constructor(private readonly transactionRepo: ITransactionRepository) {}

  async execute(input: UpdateTransactionDTO) {
    const transaction = await this.transactionRepo.findById(input.id);
    if (!transaction) throw new TransactionNotFoundError();

    const safeUpdateValue: UpdateTransactionDTO = {
      ...input,
      id: transaction.id,
    };

    console.log(safeUpdateValue);

    return await this.transactionRepo.update(safeUpdateValue);
  }
}
