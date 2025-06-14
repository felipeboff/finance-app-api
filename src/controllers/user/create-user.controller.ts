import { Request, Response } from "express";
import validator from "validator";
import { CreateUserUseCase } from "@/use-cases/user/create-user.usecase";
import { EmailAlreadyExistsError } from "@/errors/email-already-exists.error";
import { badRequest, created, serverError } from "@/helpers/http-response";

export const createUserController = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return badRequest(res, "Request body is empty");
    }

    const { first_name, last_name, email, password } = req.body;
    const missing = [];

    if (!first_name?.trim()) missing.push("first_name");
    if (!last_name?.trim()) missing.push("last_name");
    if (!email?.trim()) missing.push("email");
    if (!password?.trim()) missing.push("password");

    if (missing.length) {
      return badRequest(res, `Missing fields: ${missing.join(", ")}`);
    }

    if (!validator.isEmail(email)) {
      return badRequest(res, "Invalid email");
    }

    if (password.length < 6) {
      return badRequest(res, "Password too short (min 6)");
    }

    const usecase = new CreateUserUseCase();
    const createdUser = await usecase.execute({
      first_name,
      last_name,
      email,
      password,
    });
    return created(res, createdUser);
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return badRequest(res, err.message);
    }
    console.error(err);
    return serverError(res);
  }
};
