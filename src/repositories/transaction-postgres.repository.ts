import { query } from "@/db/postgres";
import { buildUpdateQuery } from "@/db/postgres/build-update-query.helper";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/dtos/transaction.dto";
import { UserBalanceDTO } from "@/dtos/user.dto";
import { TransactionEntity } from "@/entities/transaction.entity";
import { ITransactionRepository } from "@/repositories/types/transaction.repository";

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

  async balance(id: string): Promise<UserBalanceDTO> {
    const result = await this.db(
      `SELECT
      SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expense,
      SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investment,
        (SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)) AS balance
      FROM transactions WHERE user_id = $1`,
      [id],
    );
    return result.rows[0];
  }
}
