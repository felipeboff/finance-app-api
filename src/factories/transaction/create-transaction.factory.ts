import { CreateTransactionController } from "@/controllers/transaction/create-transaction.controller";
import { db } from "@/db";
import { TransactionsRepository } from "@/repositories/transaction.repository";
import { UserRepository } from "@/repositories/user.repository";
import { CreateTransactionUseCase } from "@/use-cases/transaction/create-transaction.usecase";

export const makeCreateTransactionController =
  (): CreateTransactionController => {
    const repo = new TransactionsRepository(db);
    const userRepo = new UserRepository(db);
    const useCase = new CreateTransactionUseCase(repo, userRepo);
    return new CreateTransactionController(useCase);
  };
