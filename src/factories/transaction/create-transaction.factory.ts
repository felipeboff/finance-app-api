import { CreateTransactionController } from "@/controllers/transaction/create-transaction.controller";
import { query } from "@/db/postgres";
import { TransactionsPostgresRepository } from "@/repositories/transaction-postgres.repository";
import { CreateTransactionUseCase } from "@/use-cases/transaction/create-transaction.usecase";

export const makeCreateTransactionController =
  (): CreateTransactionController => {
    const repo = new TransactionsPostgresRepository(query);
    const useCase = new CreateTransactionUseCase(repo);
    return new CreateTransactionController(useCase);
  };
