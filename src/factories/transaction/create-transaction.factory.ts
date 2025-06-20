import { CreateTransactionController } from "@/controllers/transaction/create-transaction.controller";
import { TransactionsPostgresRepository } from "@/repositories/transaction.repository";
import { CreateTransactionUseCase } from "@/use-cases/transaction/create-transaction.usecase";

export const makeCreateTransactionController =
  (): CreateTransactionController => {
    const repo = new TransactionsPostgresRepository();
    const useCase = new CreateTransactionUseCase(repo);
    return new CreateTransactionController(useCase);
  };
