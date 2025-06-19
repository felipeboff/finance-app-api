import { Request, Response } from "express";

import { TransactionNotFoundError } from "@/errors/transaction.error";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { UpdateTransactionUseCase } from "@/use-cases/transaction/update-transaction.usecase";
import {
  hasUnexpectedFields,
  isValidBody,
  isValidUUID,
} from "@/validators/shared.validator";
import { isValidAmount } from "@/validators/transactions.validator";

export class UpdateTransactionController {
  constructor(private readonly useCase: UpdateTransactionUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      if (!isValidBody(req.body)) {
        return badRequest(res, "Request body is empty");
      }

      const { transactionId } = req.params;
      const { title, date, amount, type, ...rest } = req.body;

      if (!isValidUUID(transactionId)) {
        return badRequest(res, "Invalid transaction ID");
      }

      if (hasUnexpectedFields(rest)) {
        return badRequest(
          res,
          `Invalid request fields: ${Object.keys(rest).join(", ")}`,
        );
      }

      if (amount && !isValidAmount(amount)) {
        return badRequest(res, "Invalid amount");
      }

      const updatedTransaction = await this.useCase.execute({
        id: transactionId,
        title,
        date,
        amount,
        type,
      });

      if (!updatedTransaction) {
        return badRequest(res, "Failed to update transaction");
      }

      return ok(res, updatedTransaction);
    } catch (err) {
      if (err instanceof TransactionNotFoundError) {
        return notFound(res, err.message);
      }

      console.error(err);
      return serverError(res);
    }
  }
}
