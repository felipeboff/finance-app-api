import { Request, Response } from "express";

import { TransactionNotFoundError } from "@/errors/transaction.error";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { DeleteTransactionUseCase } from "@/use-cases/transaction/delete-transaction.usecase";
import { isValidUUID } from "@/validators/shared.validator";

export class DeleteTransactionController {
  constructor(private readonly useCase: DeleteTransactionUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;

      if (!isValidUUID(transactionId)) {
        return badRequest(res, "Invalid transaction ID");
      }

      await this.useCase.execute(transactionId);

      return ok(res);
    } catch (err) {
      if (err instanceof TransactionNotFoundError) {
        return notFound(res, err.message);
      }

      console.error(err);
      return serverError(res);
    }
  }
}
