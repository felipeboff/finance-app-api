import { TransactionType } from "@/dtos/transaction.dto";

export const isValidTransactionType = (
  value: unknown,
): value is TransactionType =>
  Object.values(TransactionType).includes(value as TransactionType);

export const isValidAmount = (value: unknown): boolean => {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    Math.floor(value * 100) === value * 100
  );
};
