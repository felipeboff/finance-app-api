import { query } from "@/db/postgres";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/dtos/transaction.dto";
import { ITransactionRepository } from "./types/transaction.repository";
import { buildUpdateQuery } from "../db/postgres/build-update-query.helper";
import { TransactionEntity } from "@/entities/transaction.entity";

export class TransactionsPostgresRepository implements ITransactionRepository {
  constructor(private readonly db = query) {}

  async findAll(): Promise<TransactionEntity[]> {
    const result = await this.db("SELECT * FROM transactions");
    return result.rows;
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    const result = await this.db("SELECT * FROM transactions WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async create(data: CreateTransactionDTO): Promise<TransactionEntity> {
    await this.db(
      `INSERT INTO transactions (id, user_id, title, date, amount, type) VALUES ($1, $2, $3, $4, $5, $6)`,
      [data.id, data.user_id, data.title, data.date, data.amount, data.type],
    );

    const result = await this.db("SELECT * FROM transactions WHERE id = $1", [
      data.id,
    ]);
    return result.rows[0];
  }

  async update(data: UpdateTransactionDTO): Promise<TransactionEntity | null> {
    const { query, values } = buildUpdateQuery("transactions", "id", data);

    const result = await this.db(query, values);

    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await this.db("DELETE FROM transactions WHERE id = $1", [id]);
  }
}
