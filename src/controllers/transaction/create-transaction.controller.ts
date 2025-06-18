import { Request, Response } from "express";

import { CreateTransactionUseCase } from "@/use-cases/transaction/create-transaction.usecase";
import {
  badRequest,
  created,
  serverError,
} from "@/helpers/http-response.helper";
import {
  hasUnexpectedFields,
  isValidDate,
  isValidUUID,
} from "@/validators/shared.validator";
import { isValidBody } from "@/validators/shared.validator";
import { UserNotFoundError } from "@/errors/user-not-found.error";
import { isValidTransactionType } from "@/validators/transactions.validator";

export class CreateTransactionController {
  constructor(private readonly useCase: CreateTransactionUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      if (!isValidBody(req.body)) {
        return badRequest(res, "Request body is empty");
      }

      const { user_id, title, date, amount, type, ...rest } = req.body;

      if (hasUnexpectedFields(rest)) {
        return badRequest(
          res,
          `Invalid request fields: ${Object.keys(rest).join(", ")}`,
        );
      }

      const missing = [];

      if (!user_id?.trim()) missing.push("user_id");
      if (!title?.trim()) missing.push("title");
      if (!date?.trim()) missing.push("date");
      if (!amount) missing.push("amount");
      if (!type?.trim()) missing.push("type");

      if (missing.length) {
        return badRequest(res, `Missing fields: ${missing.join(", ")}`);
      }

      if (!isValidUUID(user_id)) {
        return badRequest(res, "Invalid user_id");
      }

      if (!isValidDate(date)) {
        return badRequest(res, "Invalid date");
      }

      if (!isValidTransactionType(type)) {
        return badRequest(res, "Invalid transaction type");
      }

      const transaction = await this.useCase.execute({
        user_id,
        title,
        date,
        amount,
        type,
      });

      if (!transaction) {
        return badRequest(res, "Failed to create transaction");
      }

      return created(res, transaction);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return badRequest(res, error.message);
      }

      console.error(error);
      return serverError(res);
    }
  }
}
