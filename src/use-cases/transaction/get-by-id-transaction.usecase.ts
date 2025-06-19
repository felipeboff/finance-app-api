import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";

export class GetTransactionByIdUseCase {
  constructor(
    private readonly transactionRepo = new TransactionsPostgresRepository(),
  ) {}

  async execute(transactionId: string) {
    const transaction = await this.transactionRepo.findById(transactionId);
    return transaction;
  }
}
