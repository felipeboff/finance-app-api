import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/dtos/transaction.dto";
import { TransactionEntity } from "@/entities/transaction.entity";

export interface ITransactionRepository {
  findAll(): Promise<TransactionEntity[]>;
  findById(id: string): Promise<TransactionEntity | null>;
  create(data: CreateTransactionDTO): Promise<TransactionEntity>;
  update(data: UpdateTransactionDTO): Promise<TransactionEntity | null>;
  delete(id: string): Promise<boolean>;
}
