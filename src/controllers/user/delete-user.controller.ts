import { Request, Response } from "express";

import { UserNotFoundError } from "@/errors/user.error";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user.usecase";
import { isValidUUID } from "@/validators/shared.validator";

export class DeleteUserController {
  constructor(private readonly useCase: DeleteUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      if (!isValidUUID(userId)) {
        return badRequest(res, "Invalid user ID");
      }

      await this.useCase.execute(userId);

      return ok(res);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return notFound(res, err.message);
      }

      console.error(err);
      return serverError(res);
    }
  }
}
