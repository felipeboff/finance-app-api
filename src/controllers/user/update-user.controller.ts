import { Request, Response } from "express";
import { ZodError } from "zod";

import { EmailAlreadyExistsError } from "@/errors/user.error";
import { UserNotFoundError } from "@/errors/user.error";
import {
  badRequest,
  conflict,
  notFound,
  ok,
  serverError,
} from "@/helpers/http-response.helper";
import { updateUserSchema } from "@/schema/user.schema";
import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";
import { isValidUUID } from "@/validators/shared.validator";

export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      if (!isValidUUID(userId)) {
        return badRequest(res, "Invalid user ID");
      }

      const input = await updateUserSchema.parseAsync(req.body);

      const updatedUser = await this.useCase.execute({
        id: userId,
        ...input,
      });

      if (!updatedUser) {
        return badRequest(res, "Failed to update user");
      }

      return ok(res, updatedUser);
    } catch (err) {
      if (err instanceof ZodError) {
        return badRequest(
          res,
          err.errors.map((error) => error.message).join(", "),
        );
      }

      if (err instanceof EmailAlreadyExistsError) {
        return conflict(res, err.message);
      }

      if (err instanceof UserNotFoundError) {
        return notFound(res, err.message);
      }

      console.error(err);
      return serverError(res);
    }
  }
}
