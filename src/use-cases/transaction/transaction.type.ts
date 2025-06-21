import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/dtos/transaction.dto";
import { TransactionEntity } from "@/entities/transaction.entity";

export interface ICreateTransactionUseCase {
  execute(input: CreateTransactionDTO): Promise<TransactionEntity | null>;
}

export interface IGetAllTransactionsUseCase {
  execute(): Promise<TransactionEntity[] | null>;
}

export interface IUpdateTransactionUseCase {
  execute(input: UpdateTransactionDTO): Promise<TransactionEntity | null>;
}

export interface IDeleteTransactionUseCase {
  execute(id: string): Promise<void | null>;
}

export interface IGetTransactionByIdUseCase {
  execute(id: string): Promise<TransactionEntity | null>;
}
