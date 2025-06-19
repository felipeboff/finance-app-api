import { Request, Response } from "express";

import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { GetUserByIdUseCase } from "@/use-cases/user/get-user-by-id.usecase";
import { isValidUUID } from "@/validators/shared.validator";

export class GetUserByIdController {
  constructor(private readonly useCase: GetUserByIdUseCase) {}

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
