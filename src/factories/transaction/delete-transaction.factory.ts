import { DeleteTransactionController } from "@/controllers/transaction/delete-transaction.controller";
import { TransactionsPostgresRepository } from "@/repositories/transaction.repository";
import { DeleteTransactionUseCase } from "@/use-cases/transaction/delete-transaction.usecase";

export const makeDeleteTransactionController =
  (): DeleteTransactionController => {
    const repo = new TransactionsPostgresRepository();
    const useCase = new DeleteTransactionUseCase(repo);
    return new DeleteTransactionController(useCase);
  };
