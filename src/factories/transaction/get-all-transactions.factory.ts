import { GetAllTransactionsController } from "@/controllers/transaction/get-all-transactions.controller";
import { TransactionsPostgresRepository } from "@/repositories/transaction.repository";
import { GetAllTransactionsUseCase } from "@/use-cases/transaction/get-all-transactions.usecase";

export const makeGetAllTransactionsController =
  (): GetAllTransactionsController => {
    const repo = new TransactionsPostgresRepository();
    const useCase = new GetAllTransactionsUseCase(repo);
    return new GetAllTransactionsController(useCase);
  };
