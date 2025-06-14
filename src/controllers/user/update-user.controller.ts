import { badRequest, ok, serverError } from "@/helpers/http-response";
import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";
import { Request, Response } from "express";
import { validate as isUUID } from "uuid";
import validator from "validator";

export const updateUserController = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return badRequest(res, "Request body is empty");
    }

    const { userId } = req.params;
    const { first_name, last_name, email, password, ...rest } = req.body;

    if (!isUUID(userId)) {
      return badRequest(res, "Invalid user ID");
    }

    if (Object.keys(rest).length > 0) {
      const invalidFields = Object.keys(rest).map((key) => key);
      return badRequest(
        res,
        `Invalid request fields: ${invalidFields.join(", ")}`,
      );
    }

    if (email && !validator.isEmail(email)) {
      return badRequest(res, "Invalid email");
    }

    if (password && password.length < 6) {
      return badRequest(res, "Password too short (min 6)");
    }

    const updateUserUseCase = new UpdateUserUseCase();
    const user = await updateUserUseCase.execute({
      id: userId,
      first_name,
      last_name,
      email,
      password,
    });

    return ok(res, user);
  } catch (error) {
    console.error(error);
    return serverError(res);
  }
};
