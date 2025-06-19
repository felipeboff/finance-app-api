import { DeleteTransactionController } from "@/controllers/transaction/delete-transaction.controller";
import { query } from "@/db/postgres";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";
import { DeleteTransactionUseCase } from "@/use-cases/transaction/delete-transaction.usecase";

export const makeDeleteTransactionController =
  (): DeleteTransactionController => {
    const repo = new TransactionsPostgresRepository(query);
    const useCase = new DeleteTransactionUseCase(repo);
    return new DeleteTransactionController(useCase);
  };
