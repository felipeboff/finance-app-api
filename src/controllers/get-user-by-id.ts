import { Request } from "express";
import { GetUserByIdUseCase } from "@/use-cases/get-user-by-is";
import { ok, serverError } from "./helper";

export class GetUserByIdController {
  async execute(request: Request): Promise<{ status: number; body: unknown }> {
    try {
      const { userId } = request.params;
      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(userId);
      return ok({ data: user });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
