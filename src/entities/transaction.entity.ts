export interface TransactionEntity {
  id: string;
  user_id: string;
  title: string;
  date: Date;
  amount: number;
  type: string;
  created_at: Date;
}
