import { Request, Response } from "express";
import { validate as isUUID } from "uuid";
import { GetUserByIdUseCase } from "@/use-cases/user/get-user-by-id.usecase";
import { badRequest, notFound, ok, serverError } from "@/helpers/http-response";

export class GetUserByIdController {
  constructor(private readonly useCase: GetUserByIdUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      if (!isUUID(userId)) {
        return badRequest(res, "Invalid user ID");
      }

      const user = await this.useCase.execute(userId);

      if (!user) {
        return notFound(res, "User not found");
      }

      return ok(res, user);
    } catch (err) {
      console.error(err);
      return serverError(res);
    }
  }
}
