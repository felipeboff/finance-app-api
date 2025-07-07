import { Response } from "express";

import { IGetAllTransactionsController } from "@/controllers/types/transaction.type";
import { ok, serverError } from "@/helpers/http-response.helper";
import { IGetAllTransactionsUseCase } from "@/use-cases/transaction/transaction.type";

export class GetAllTransactionsController
  implements IGetAllTransactionsController
{
  constructor(private readonly useCase: IGetAllTransactionsUseCase) {}

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
