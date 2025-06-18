import { Request, Response } from "express";
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { isValidUUID } from "@/validators/shared.validator";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user.usecase";
import { UserNotFoundError } from "@/errors/user-not-found.error";

export class DeleteUserController {
  constructor(private readonly useCase: DeleteUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      if (!isValidUUID(userId)) {
        return badRequest(res, "Invalid user ID");
      }

      await this.useCase.execute(userId);

      return ok(res, "User deleted successfully");
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return notFound(res, err.message);
      }

      console.error(err);
      return serverError(res);
    }
  }
}
