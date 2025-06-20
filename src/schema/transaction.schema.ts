import { z } from "zod";

import { TransactionType } from "@/dtos/transaction.dto";

export const createTransactionSchema = z
  .object({
    user_id: z.string({ required_error: "User ID is required" }).uuid(),
    amount: z
      .number({ required_error: "Amount is required" })
      .refine((val) => Math.floor(val * 100) === val * 100, {
        message: "Amount must have at most two decimal places",
      }),
    type: z.nativeEnum(TransactionType, {
      required_error: "Type is required",
    }),
    title: z
      .string({ required_error: "Title is required" })
      .trim()
      .nonempty("Title is required"),
    date: z.coerce.date({ required_error: "Date is required" }),
  })
  .strict();

export const updateTransactionSchema = createTransactionSchema.partial();
