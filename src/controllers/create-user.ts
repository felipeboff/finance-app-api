import { CreateUserUseCase } from "@/use-cases/create-user";
import { Request } from "express";

export class CreateUserController {
  async execute(request: Request) {
    try {
      const params = request.body;
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "password",
      ] as const;

      for (const field of requiredFields) {
        if (!params || !params[field] || !params[field].trim()) {
          return {
            status: 400,
            body: {
              error: `Missing required field: ${field}`,
            },
          };
        }
      }

      const createUserUseCase = new CreateUserUseCase();
      const user = await createUserUseCase.execute(params);

      return {
        status: 201,
        body: user,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        body: { error: "Internal server error" },
      };
    }
  }
}
