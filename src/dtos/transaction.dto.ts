export interface CreateTransactionDTO {
  user_id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
}

export interface UpdateTransactionDTO {
  id: string;
  user_id?: string;
  name?: string;
  date?: Date;
  amount?: number;
  type?: string;
}
