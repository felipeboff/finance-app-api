import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "EARNING",
  "EXPENSE",
  "INVESTMENT",
]);

export const transactions = pgTable("transactions", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  date: timestamp("date").notNull(),
  amount: integer("amount").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  type: transactionTypeEnum("type").notNull(),
});

export type TransactionRow = InferSelectModel<typeof transactions>;
export type CreateTransactionInput = InferInsertModel<typeof transactions>;
export type UpdateTransactionInput = Partial<
  InferInsertModel<typeof transactions>
> & {
  id: string;
};
