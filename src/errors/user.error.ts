import { AppError } from "./app.error";

export class UserNotFoundError extends AppError {
  constructor() {
    super("User not found", 404);
  }
}

export class EmailAlreadyExistsError extends AppError {
  constructor() {
    super("Email already exists", 409);
  }
}
