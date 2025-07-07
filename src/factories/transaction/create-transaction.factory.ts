import { CreateTransactionController } from "@/controllers/transaction/create-transaction.controller";
import { db } from "@/db";
import { TransactionsPostgresRepository } from "@/repositories/transaction.repository";
import { UserPostgresRepository } from "@/repositories/user.repository";
import { CreateTransactionUseCase } from "@/use-cases/transaction/create-transaction.usecase";

export const makeCreateTransactionController =
  (): CreateTransactionController => {
    const repo = new TransactionsPostgresRepository(db);
    const userRepo = new UserPostgresRepository(db);
    const useCase = new CreateTransactionUseCase(repo, userRepo);
    return new CreateTransactionController(useCase);
  };
