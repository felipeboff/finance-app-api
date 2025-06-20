import { eq } from "drizzle-orm";

import { db } from "@/db";
import { transactions } from "@/db/schema/transactions";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/dtos/transaction.dto";
import { TransactionEntity } from "@/entities/transaction.entity";
import { ITransactionRepository } from "@/repositories/types/transaction.type";

export class TransactionsPostgresRepository implements ITransactionRepository {
  async findAll(): Promise<TransactionEntity[]> {
    const rows = await db.select().from(transactions);

    return rows;
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    const [result] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id));

    return result;
  }

  async create(data: CreateTransactionDTO): Promise<TransactionEntity> {
    const [result] = await db.insert(transactions).values(data).returning();

    return result;
  }
  async update(data: UpdateTransactionDTO): Promise<TransactionEntity | null> {
    const [result] = await db
      .update(transactions)
      .set(data)
      .where(eq(transactions.id, data.id))
      .returning();

    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db
      .delete(transactions)
      .where(eq(transactions.id, id))
      .returning();

    return result.length > 0;
  }
}
