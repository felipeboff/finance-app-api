export enum TransactionType {
  EARNING = "EARNING",
  EXPENSE = "EXPENSE",
  INVESTMENT = "INVESTMENT",
}

export interface CreateTransactionDTO {
  id: string;
  user_id: string;
  title: string;
  date: Date;
  amount: number;
  type: TransactionType;
}

export interface UpdateTransactionDTO {
  id: string;
  title?: string;
  date?: Date;
  amount?: number;
  type?: TransactionType;
}
