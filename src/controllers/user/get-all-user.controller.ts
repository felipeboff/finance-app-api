import { ok, serverError } from "@/helpers/http-response.helper";
import { GetAllUsersUseCase } from "@/use-cases/user/get-all-users.usecase";
import { Response } from "express";

export class GetAllUserController {
  constructor(private readonly useCase: GetAllUsersUseCase) {}

  async execute(res: Response): Promise<Response> {
    try {
      const users = await this.useCase.execute();
      return ok(res, users);
    } catch (error) {
      console.error(error);
      return serverError(res);
    }
  }
}
