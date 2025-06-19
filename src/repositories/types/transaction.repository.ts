import { TransactionEntity } from "@/entities/transaction.entity";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/dtos/transaction.dto";

export interface ITransactionRepository {
  findAll(): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity | null>;
  create(data: CreateTransactionDTO): Promise<TransactionEntity>;
  update(data: UpdateTransactionDTO): Promise<TransactionEntity | null>;
  delete(id: string): Promise<void>;
}
