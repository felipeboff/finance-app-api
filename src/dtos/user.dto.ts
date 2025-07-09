export interface CreateUserDTO {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

export interface UserBalanceDTO {
  user_id: string;
  expenses: number;
  earnings: number;
  investments: number;
  earnings_percentage: number;
  expenses_percentage: number;
  investments_percentage: number;
  balance: number;
}
