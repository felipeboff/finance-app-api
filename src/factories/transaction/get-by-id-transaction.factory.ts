import { GetTransactionByIdController } from "@/controllers/transaction/get-by-id-transaction.controller";
import { query } from "@/db/postgres";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";
import { GetTransactionByIdUseCase } from "@/use-cases/transaction/get-by-id-transaction.usecase";

export const makeGetTransactionByIdController =
  (): GetTransactionByIdController => {
    const repo = new TransactionsPostgresRepository(query);
    const useCase = new GetTransactionByIdUseCase(repo);
    return new GetTransactionByIdController(useCase);
  };
