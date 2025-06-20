import { Request, Response } from "express";
import { ZodError } from "zod";

import { UserNotFoundError } from "@/errors/user.error";
import {
  badRequest,
  created,
  serverError,
} from "@/helpers/http-response.helper";
import { createTransactionSchema } from "@/schema/transaction.schema";
import { CreateTransactionUseCase } from "@/use-cases/transaction/create-transaction.usecase";
import { isValidAmount } from "@/validators/transactions.validator";

export class CreateTransactionController {
  constructor(private readonly useCase: CreateTransactionUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = await createTransactionSchema.parseAsync(req.body);

      if (!isValidAmount(input.amount)) {
        return badRequest(res, "Invalid amount");
      }

      const transactionCreated = await this.useCase.execute({
        ...input,
      });

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
