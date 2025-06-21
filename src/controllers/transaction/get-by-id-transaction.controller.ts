import { Request, Response } from "express";

import { IGetTransactionByIdController } from "@/controllers/transaction/transaction.type";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { IGetTransactionByIdUseCase } from "@/use-cases/transaction/transaction.type";
import { isValidUUID } from "@/validators/shared.validator";

export class GetTransactionByIdController
  implements IGetTransactionByIdController
{
  constructor(private readonly useCase: IGetTransactionByIdUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionId } = req.params;

      if (!isValidUUID(transactionId)) {
        return badRequest(res, "Invalid transaction ID");
      }

      const transaction = await this.useCase.execute(transactionId);

      if (!transaction) {
        return notFound(res, "Transaction not found");
      }

      return ok(res, transaction);
    } catch (err) {
      console.error(err);
      return serverError(res);
    }
  }
}
