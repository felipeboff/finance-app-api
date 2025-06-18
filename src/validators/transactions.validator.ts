import { TransactionType } from "@/dtos/transaction.dto";

export const isValidTransactionType = (
  value: unknown,
): value is TransactionType =>
  Object.values(TransactionType).includes(value as TransactionType);
