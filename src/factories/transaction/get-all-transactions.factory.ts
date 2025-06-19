import { GetAllTransactionsController } from "@/controllers/transaction/get-all-transactions.controller";
import { query } from "@/db/postgres";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";
import { GetAllTransactionsUseCase } from "@/use-cases/transaction/get-all-transactions.usecase";

export const makeGetAllTransactionsController =
  (): GetAllTransactionsController => {
    const repo = new TransactionsPostgresRepository(query);
    const useCase = new GetAllTransactionsUseCase(repo);
    return new GetAllTransactionsController(useCase);
  };
