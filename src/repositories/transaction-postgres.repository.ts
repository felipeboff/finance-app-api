import { query } from "@/db/postgres";
import { TransactionEntity } from "@/entities/transaction.entity";

export class TransactionsPostgresRepository {
  constructor(private readonly db = query) {}

  async findAll(): Promise<TransactionEntity[]> {
    const result = await this.db("SELECT * FROM transactions");
    return result.rows;
  }

  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    await this.db(
      `INSERT INTO transactions (id, user_id, title, date, amount, type) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        transaction.id,
        transaction.user_id,
        transaction.title,
        transaction.date,
        transaction.amount,
        transaction.type,
      ],
    );

    const result = await this.db("SELECT * FROM transactions WHERE id = $1", [
      transaction.id,
    ]);
    return result.rows[0];
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    const result = await this.db("SELECT * FROM transactions WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  async update(transaction: TransactionEntity): Promise<TransactionEntity> {
    const result = await this.db(
      `UPDATE transactions SET amount = $1, type = $2 WHERE id = $3 RETURNING *`,
      [transaction.amount, transaction.type, transaction.id],
    );

    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.db("DELETE FROM users WHERE id = $1", [id]);
  }
}
