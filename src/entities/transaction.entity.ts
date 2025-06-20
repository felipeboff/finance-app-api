import { TransactionType } from "@/dtos/transaction.dto";

export interface TransactionEntity {
  id: string;
  user_id: string;
  title: string;
  date: Date;
  amount: number;
  type: TransactionType;
  created_at: Date;
}
