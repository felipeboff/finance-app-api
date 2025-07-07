import { Request, Response } from "express";

import { IGetUserBalanceController } from "@/controllers/types/user.type";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { IGetUserBalanceUseCase } from "@/use-cases/user/user.type";
import { isValidUUID } from "@/validators/shared.validator";

export class GetUserBalanceController implements IGetUserBalanceController {
  constructor(private readonly useCase: IGetUserBalanceUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      if (!isValidUUID(userId)) {
        return badRequest(res, "Invalid user ID");
      }

      const user = await this.useCase.execute(userId);

      if (!user) {
        return notFound(res, "User not found");
      }

      return ok(res, user);
    } catch (err) {
      console.error(err);
      return serverError(res);
    }
  }
}
