import { Request, Response } from "express";
import { CreateUserUseCase } from "@/use-cases/user/create-user.usecase";
import {
  badRequest,
  conflict,
  created,
  serverError,
} from "@/helpers/http-response.helper";
import {
  hasUnexpectedFields,
  isValidBody,
  isValidEmail,
  isValidPassword,
} from "@/validators/shared.validator";
import { EmailAlreadyExistsError } from "@/errors/user.error";

export class CreateUserController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      if (!isValidBody(req.body)) {
        return badRequest(res, "Request body is empty");
      }

      const { first_name, last_name, email, password, ...rest } = req.body;

      if (hasUnexpectedFields(rest)) {
        return badRequest(
          res,
          `Invalid request fields: ${Object.keys(rest).join(", ")}`,
        );
      }

      const missing = [];

      if (!first_name?.trim()) missing.push("first_name");
      if (!last_name?.trim()) missing.push("last_name");
      if (!email?.trim()) missing.push("email");
      if (!password?.trim()) missing.push("password");

      if (missing.length) {
        return badRequest(res, `Missing fields: ${missing.join(", ")}`);
      }

      if (!isValidEmail(email)) {
        return badRequest(res, "Invalid email");
      }

      if (!isValidPassword(password)) {
        return badRequest(res, "Password too short (min 6)");
      }

      const createdUser = await this.useCase.execute({
        first_name,
        last_name,
        email,
        password,
      });

      if (!createdUser) {
        return badRequest(res, "Failed to create user");
      }

      return created(res, createdUser);
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError) {
        return conflict(res, err.message);
      }

      console.error(err);
      return serverError(res);
    }
  }
}
