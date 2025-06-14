import { Request } from "express";
import validator from "validator";

import { CreateUserUseCase } from "@/use-cases/create-user";
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

      if (!validator.isEmail(params.email)) {
        return {
          status: 400,
          body: { error: "Invalid email" },
        };
      }

      if (params.password.length < 6) {
        return {
          status: 400,
          body: { error: "Password must be at least 6 characters long" },
        };
      } else if (!validator.isStrongPassword(params.password)) {
        return {
          status: 400,
          body: {
            error:
              "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
          },
        };
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
