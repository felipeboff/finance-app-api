export interface TransactionEntity {
  id: string;
  user_id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
  created_at: Date;
}
