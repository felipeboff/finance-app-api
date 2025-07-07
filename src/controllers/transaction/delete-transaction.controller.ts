import { Request, Response } from "express";

import { IDeleteTransactionController } from "@/controllers/types/transaction.type";
import { TransactionNotFoundError } from "@/errors/transaction.error";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { IDeleteTransactionUseCase } from "@/use-cases/transaction/transaction.type";
import { isValidUUID } from "@/validators/shared.validator";

export class DeleteTransactionController
  implements IDeleteTransactionController
{
  constructor(private readonly useCase: IDeleteTransactionUseCase) {}

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
