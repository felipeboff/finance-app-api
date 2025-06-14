import { Request, Response } from "express";
import { validate as isUUID } from "uuid";
import { GetUserByIdUseCase } from "@/use-cases/user/get-user-by-id.usecase";
import { badRequest, notFound, ok, serverError } from "@/helpers/http-response";

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!isUUID(userId)) {
      return badRequest(res, "Invalid user ID");
    }

    const usecase = new GetUserByIdUseCase();
    const user = await usecase.execute(userId);

    if (!user) {
      return notFound(res, "User not found");
    }

    return ok(res, user);
  } catch (err) {
    console.error(err);
    return serverError(res);
  }
};
