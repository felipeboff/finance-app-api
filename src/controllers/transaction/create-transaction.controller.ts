import { Request, Response } from "express";
import { ZodError } from "zod";

import { ICreateTransactionController } from "@/controllers/transaction/transaction.type";
import { UserNotFoundError } from "@/errors/user.error";
import {
  badRequest,
  created,
  serverError,
} from "@/helpers/http-response.helper";
import { createTransactionSchema } from "@/schema/transaction.schema";
import { ICreateTransactionUseCase } from "@/use-cases/transaction/transaction.type";

export class CreateTransactionController
  implements ICreateTransactionController
{
  constructor(private readonly useCase: ICreateTransactionUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = await createTransactionSchema.parseAsync(req.body);

      const transactionCreated = await this.useCase.execute(input);

      if (!transactionCreated) {
        return badRequest(res, "Failed to create transaction");
      }

      return created(res, transactionCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(
          res,
          error.errors.map((error) => error.message).join(", "),
        );
      }

      if (error instanceof UserNotFoundError) {
        return badRequest(res, error.message);
      }

      console.error(error);
      return serverError(res);
    }
  }
}
