import { DeleteTransactionController } from "@/controllers/transaction/delete-transaction.controller";
import { db } from "@/db";
import { TransactionsRepository } from "@/repositories/transaction.repository";
import { DeleteTransactionUseCase } from "@/use-cases/transaction/delete-transaction.usecase";

export const makeDeleteTransactionController =
  (): DeleteTransactionController => {
    const repo = new TransactionsRepository(db);
    const useCase = new DeleteTransactionUseCase(repo);
    return new DeleteTransactionController(useCase);
  };
