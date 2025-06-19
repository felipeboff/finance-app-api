import { Request, Response } from "express";

import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { GetTransactionByIdUseCase } from "@/use-cases/transaction/get-by-id-transaction.usecase";
import { isValidUUID } from "@/validators/shared.validator";

export class GetTransactionByIdController {
  constructor(private readonly useCase: GetTransactionByIdUseCase) {}

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
