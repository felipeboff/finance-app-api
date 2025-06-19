import { UpdateTransactionDTO } from "@/dtos/transaction.dto";
import { TransactionNotFoundError } from "@/errors/transaction.error";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";

export class UpdateTransactionUseCase {
  constructor(
    private readonly transactionRepo = new TransactionsPostgresRepository(),
  ) {}
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
