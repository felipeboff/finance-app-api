import { Request, Response } from "express";
import { ZodError } from "zod";

import { ICreateUserController } from "@/controllers/user/user.type";
import { EmailAlreadyExistsError } from "@/errors/user.error";
import {
  badRequest,
  conflict,
  created,
  serverError,
} from "@/helpers/http-response.helper";
import { createUserSchema } from "@/schema/user.schema";
import { ICreateUserUseCase } from "@/use-cases/user/user.type";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly useCase: ICreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = await createUserSchema.parseAsync(req.body);

      const createdUser = await this.useCase.execute(input);

      if (!createdUser) {
        return badRequest(res, "Failed to create user");
      }

      return created(res, createdUser);
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

      console.error(err);
      return serverError(res);
    }
  }
}
