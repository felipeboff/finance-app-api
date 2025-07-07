import { UpdateTransactionController } from "@/controllers/transaction/update-transaction.controller";
import { db } from "@/db";
import { TransactionsPostgresRepository } from "@/repositories/transaction.repository";
import { UpdateTransactionUseCase } from "@/use-cases/transaction/update-transaction.usecase";

export const makeUpdateTransactionController =
  (): UpdateTransactionController => {
    const repo = new TransactionsPostgresRepository(db);
    const useCase = new UpdateTransactionUseCase(repo);
    return new UpdateTransactionController(useCase);
  };
