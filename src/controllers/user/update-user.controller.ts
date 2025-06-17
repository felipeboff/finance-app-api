import { Request, Response } from "express";
import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";
import { badRequest, ok, serverError } from "@/helpers/http-response";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { UserNotFoundError } from "@/errors/user-not-found.error";
import {
  hasInvalidFields,
  isValidBody,
  isValidEmail,
  isValidPassword,
  isValidUUID,
} from "@/validators/shared.validator";

export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      if (!isValidBody(req.body)) {
        return badRequest(res, "Request body is empty");
      }

      const { userId } = req.params;
      const { first_name, last_name, email, password, ...rest } = req.body;

      if (!isValidUUID(userId)) {
        return badRequest(res, "Invalid user ID");
      }

      if (hasInvalidFields(rest)) {
        return badRequest(
          res,
          `Invalid request fields: ${Object.keys(rest).join(", ")}`,
        );
      }

      if (email && !isValidEmail(email)) {
        return badRequest(res, "Invalid email");
      }

      if (password && !isValidPassword(password)) {
        return badRequest(res, "Password too short (min 6)");
      }

      const updatedUser = await this.useCase.execute({
        id: userId,
        first_name,
        last_name,
        email,
        password,
      });

      if (!updatedUser) {
        return badRequest(res, "Failed to update user");
      }

      return ok(res, updatedUser);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return badRequest(res, error.message);
      }

      if (error instanceof UserNotFoundError) {
        return badRequest(res, error.message);
      }

      console.error(error);
      return serverError(res);
    }
  }
}
