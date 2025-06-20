import { Request, Response } from "express";

import { TransactionNotFoundError } from "@/errors/transaction.error";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { updateTransactionSchema } from "@/schema/transaction.schema";
import { UpdateTransactionUseCase } from "@/use-cases/transaction/update-transaction.usecase";
import { isValidUUID } from "@/validators/shared.validator";

export class UpdateTransactionController {
  constructor(private readonly useCase: UpdateTransactionUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;

      if (!isValidUUID(transactionId)) {
        return badRequest(res, "Invalid transaction ID");
      }

      const input = await updateTransactionSchema.parseAsync(req.body);

      const updatedTransaction = await this.useCase.execute({
        id: transactionId,
        ...input,
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
