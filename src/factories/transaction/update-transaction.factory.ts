import { UpdateTransactionController } from "@/controllers/transaction/update-transaction.controller";
import { query } from "@/db/postgres";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";
import { UpdateTransactionUseCase } from "@/use-cases/transaction/update-transaction.usecase";

export const makeUpdateTransactionController =
  (): UpdateTransactionController => {
    const repo = new TransactionsPostgresRepository(query);
    const useCase = new UpdateTransactionUseCase(repo);
    return new UpdateTransactionController(useCase);
  };
