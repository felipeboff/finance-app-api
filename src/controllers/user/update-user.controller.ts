import { badRequest, notFound, ok, serverError } from "@/helpers/http-response";
import { UpdateUserUseCase } from "@/use-cases/user/update-user.usecase";
import { Request, Response } from "express";
import { validate as isUUID } from "uuid";

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { first_name, last_name, email, password, ...rest } = req.body;

    if (!isUUID(userId)) return badRequest(res, "Invalid user ID");

    if (rest.length > 0) return badRequest(res, "Invalid request body");

    const updateUserUseCase = new UpdateUserUseCase();
    const user = await updateUserUseCase.execute({
      id: userId,
      first_name,
      last_name,
      email,
      password,
    });

    if (!user) return notFound(res, "User not found");
    return ok(res, user);
  } catch (error) {
    console.error(error);
    return serverError(res);
  }
};
