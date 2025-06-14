import validator from "validator";
import { validate as isUUID } from "uuid";

export const isValidEmail = (email: string) => validator.isEmail(email);
export const isValidUUID = (id: string) => isUUID(id);
export const isValidPassword = (password: string) => password.length >= 6;
export const isValidBody = (body: Request) => Object.keys(body).length > 0;
export const hasInvalidFields = (rest: Record<string, unknown>): boolean =>
  Object.keys(rest).length > 0;
