import { Request } from "express";
import { GetUserByIdUseCase } from "@/use-cases/get-user-by-is";
import { badRequest, ok, serverError } from "./helper";
import { validate as uuidValidate } from "uuid";

export class GetUserByIdController {
  async execute(request: Request): Promise<{ status: number; body: unknown }> {
    try {
      const { userId } = request.params;
      if (!uuidValidate(userId)) {
        return badRequest({ message: "Invalid user ID" });
      }
      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);
      return ok({ data: user });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
