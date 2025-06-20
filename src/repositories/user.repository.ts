import { and, eq, gte, lte } from "drizzle-orm";

import { db } from "@/db";
import { transactions } from "@/db/schema/transactions";
import { users } from "@/db/schema/users";
import { TransactionType } from "@/dtos/transaction.dto";
import { CreateUserDTO, UpdateUserDTO, UserBalanceDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import { IUserRepository } from "@/repositories/types/user.type";

export class UserPostgresRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const [result] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result;
  }

  async create(user: CreateUserDTO): Promise<UserEntity> {
    const [result] = await db.insert(users).values(user).returning();
    return result;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const [result] = await db.select().from(users).where(eq(users.id, id));
    return result;
  }

  async update(data: UpdateUserDTO): Promise<UserEntity | null> {
    const [result] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, data.id))
      .returning();
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  async findAll(): Promise<UserEntity[]> {
    const result = await db.select().from(users);
    return result;
  }

  async balance(id: string): Promise<UserBalanceDTO> {
    const filters = (type: TransactionType) =>
      and(
        eq(transactions.user_id, id),
        eq(transactions.type, type),
        gte(transactions.date, new Date("2020-01-01")),
        lte(transactions.date, new Date("2030-12-31")),
      );

    const sumAmount = async (type: TransactionType): Promise<number> => {
      const rows = await db
        .select({ amount: transactions.amount })
        .from(transactions)
        .where(filters(type));

      return rows.reduce((acc, { amount }) => acc + amount, 0);
    };

    const earnings = await sumAmount(TransactionType.EARNING);
    const expenses = await sumAmount(TransactionType.EXPENSE);
    const investments = await sumAmount(TransactionType.INVESTMENT);

    const total = earnings + expenses + investments;
    const balance = earnings - expenses - investments;

    const percentage = (value: number) =>
      total === 0 ? 0 : Math.floor((value / total) * 100);

    return {
      user_id: id,
      earnings,
      expenses,
      investments,
      earnings_percentage: percentage(earnings),
      expenses_percentage: percentage(expenses),
      investments_percentage: percentage(investments),
      balance,
    };
  }
}
