import { z } from "zod";

import { TransactionType } from "@/dtos/transaction.dto";

export const createTransactionSchema = z
  .object({
    user_id: z.string({ required_error: "User ID is required" }),
    amount: z.number({ required_error: "Amount is required" }),
    type: z.nativeEnum(TransactionType, {
      required_error: "Type is required",
    }),
    title: z
      .string({ required_error: "Title is required" })
      .trim()
      .nonempty("Title is required"),
    date: z.preprocess(
      (val) => (typeof val === "string" ? new Date(val) : val),
      z.date({ required_error: "Date is required" }),
    ),
  })
  .strict();

export const updateTransactionSchema = createTransactionSchema.partial();
