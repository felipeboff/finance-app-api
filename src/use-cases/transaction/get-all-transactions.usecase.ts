import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";

export class GetAllTransactionsUseCase {
  constructor(
    private readonly transactionRepo = new TransactionsPostgresRepository(),
  ) {}

  async execute() {
    const transactions = await this.transactionRepo.findAll();
    return transactions;
  }
}
