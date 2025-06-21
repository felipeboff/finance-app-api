import { Response } from "express";

import { IGetAllUsersController } from "@/controllers/user/user.type";
import { ok, serverError } from "@/helpers/http-response.helper";
import { IGetAllUsersUseCase } from "@/use-cases/user/user.type";

export class GetAllUserController implements IGetAllUsersController {
  constructor(private readonly useCase: IGetAllUsersUseCase) {}

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
