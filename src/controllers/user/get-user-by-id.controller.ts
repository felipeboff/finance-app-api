import { Request, Response } from "express";

import { IGetUserByIdController } from "@/controllers/user/user.type";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { IGetUserByIdUseCase } from "@/use-cases/user/user.type";
import { isValidUUID } from "@/validators/shared.validator";

export class GetUserByIdController implements IGetUserByIdController {
  constructor(private readonly useCase: IGetUserByIdUseCase) {}

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
