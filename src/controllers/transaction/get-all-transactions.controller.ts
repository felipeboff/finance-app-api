import { Response } from "express";

import { ok, serverError } from "@/helpers/http-response.helper";
import { GetAllTransactionsUseCase } from "@/use-cases/transaction/get-all-transactions.usecase";

export class GetAllTransactionsController {
  constructor(private readonly useCase: GetAllTransactionsUseCase) {}

  async execute(res: Response): Promise<Response> {
    try {
      const transactions = await this.useCase.execute();
      return ok(res, transactions);
    } catch (error) {
      console.error(error);
      return serverError(res);
    }
  }
}
