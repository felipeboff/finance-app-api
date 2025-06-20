import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferInsertModel } from "drizzle-orm/table";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export type UserRow = InferSelectModel<typeof users>;
export type CreateUserInput = InferInsertModel<typeof users>;
export type UpdateUserInput = Partial<InferInsertModel<typeof users>> & {
  id: string;
};
