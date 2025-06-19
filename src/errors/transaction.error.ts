import { AppError } from "./app.error";

export class TransactionNotFoundError extends AppError {
  constructor() {
    super("Transaction not found", 404);
  }
}
