import { Request, Response } from "express";

import { IUpdateTransactionController } from "@/controllers/types/transaction.type";
import { TransactionNotFoundError } from "@/errors/transaction.error";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { updateTransactionSchema } from "@/schema/transaction.schema";
import { IUpdateTransactionUseCase } from "@/use-cases/transaction/transaction.type";
import { isValidUUID } from "@/validators/shared.validator";

export class UpdateTransactionController
  implements IUpdateTransactionController
{
  constructor(private readonly useCase: IUpdateTransactionUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;

      if (!isValidUUID(transactionId)) {
        return badRequest(res, "Invalid transaction ID");
      }

      const input = await updateTransactionSchema.parseAsync(req.body);

      const updatedTransaction = await this.useCase.execute(input);

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
