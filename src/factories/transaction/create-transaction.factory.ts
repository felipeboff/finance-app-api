import { query } from "@/db/postgres";
import { CreateTransactionController } from "@/controllers/transaction/create-transaction.controller";
import { CreateTransactionUseCase } from "@/use-cases/transaction/create-transaction.usecase";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";

export const makeCreateTransactionController =
  (): CreateTransactionController => {
    const repo = new TransactionsPostgresRepository(query);
    const useCase = new CreateTransactionUseCase(repo);
    return new CreateTransactionController(useCase);
  };
