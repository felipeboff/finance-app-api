import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { transactions } from "@/db/schema/transactions";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/dtos/transaction.dto";
import { TransactionEntity } from "@/entities/transaction.entity";
import { ITransactionRepository } from "@/repositories/types/transaction.type";

export class TransactionsRepository implements ITransactionRepository {
  constructor(private readonly db: NodePgDatabase) {}

  async findAll(): Promise<TransactionEntity[]> {
    const rows = await this.db.select().from(transactions);

    return rows;
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    const [result] = await this.db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id));

    return result;
  }

  async create(data: CreateTransactionDTO): Promise<TransactionEntity> {
    const [result] = await this.db
      .insert(transactions)
      .values(data)
      .returning();

    return result;
  }
  async update(
    data: UpdateTransactionDTO,
    transactionId: string,
  ): Promise<TransactionEntity | null> {
    const [result] = await this.db
      .update(transactions)
      .set(data)
      .where(eq(transactions.id, transactionId))
      .returning();

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(transactions)
      .where(eq(transactions.id, id))
      .returning();

    return result.length > 0;
  }
}
