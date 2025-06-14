import { Request } from "express";
import validator from "validator";

import { CreateUserInput, CreateUserUseCase } from "@/use-cases/create-user";
import { badRequest, created, serverError } from "./helper";
export class CreateUserController {
  async execute(request: Request) {
    try {
      if (!request.body) {
        return badRequest({ message: "Request body is required" });
      }

      const { firstName, lastName, email, password } = request.body;

      const missingFields: string[] = [];

      if (!firstName?.trim()) missingFields.push("firstName");
      if (!lastName?.trim()) missingFields.push("lastName");
      if (!email?.trim()) missingFields.push("email");
      if (!password?.trim()) missingFields.push("password");

      if (missingFields.length) {
        return badRequest({
          message: `Missing required fields: ${missingFields.join(", ")}`,
        });
      }

      if (!validator.isEmail(email)) {
        return badRequest({ message: "Invalid email" });
      }

      if (password.length < 6) {
        return badRequest({
          message: "Password must be at least 6 characters long",
        });
      }

      const user: CreateUserInput = {
        id: "",
        firstName,
        lastName,
        email,
        password,
      };

      const createUserUseCase = new CreateUserUseCase();
      const userCreated = await createUserUseCase.execute(user);

      return created({ data: userCreated });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
