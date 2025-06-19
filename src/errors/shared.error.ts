import { AppError } from "./app.error";

export class SharedError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
