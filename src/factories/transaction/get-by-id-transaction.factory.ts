import { GetTransactionByIdController } from "@/controllers/transaction/get-by-id-transaction.controller";
import { db } from "@/db";
import { TransactionsPostgresRepository } from "@/repositories/transaction.repository";
import { GetTransactionByIdUseCase } from "@/use-cases/transaction/get-by-id-transaction.usecase";

export const makeGetTransactionByIdController =
  (): GetTransactionByIdController => {
    const repo = new TransactionsPostgresRepository(db);
    const useCase = new GetTransactionByIdUseCase(repo);
    return new GetTransactionByIdController(useCase);
  };
