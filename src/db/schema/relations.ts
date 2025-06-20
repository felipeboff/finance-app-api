import { relations } from "drizzle-orm";

import { transactions } from "./transactions";
import { users } from "./users";

export const userRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.user_id],
    references: [users.id],
  }),
}));
