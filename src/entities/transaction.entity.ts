export interface TransactionEntity {
  id: string;
  user_id: string;
  title: string;
  date: Date;
  amount: number;
  type: "EARNING" | "EXPENSE" | "INVESTMENT";
  created_at: Date;
}
