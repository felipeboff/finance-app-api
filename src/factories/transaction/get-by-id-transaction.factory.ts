import { GetTransactionByIdController } from "@/controllers/transaction/get-by-id-transaction.controller";
import { db } from "@/db";
import { TransactionsRepository } from "@/repositories/transaction.repository";
import { GetTransactionByIdUseCase } from "@/use-cases/transaction/get-by-id-transaction.usecase";

export const makeGetTransactionByIdController =
  (): GetTransactionByIdController => {
    const repo = new TransactionsRepository(db);
    const useCase = new GetTransactionByIdUseCase(repo);
    return new GetTransactionByIdController(useCase);
  };
