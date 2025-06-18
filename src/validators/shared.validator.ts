import validator from "validator";
import { validate as isUUID } from "uuid";

export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const isValidUUID = (id: string): boolean => {
  return isUUID(id);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidBody = (body: Record<string, unknown>): boolean => {
  return Object.keys(body).length > 0;
};

export const hasUnexpectedFields = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length > 0;
};

export const isValidDate = (date: string): boolean => {
  const parsed = new Date(date);
  return (
    !isNaN(parsed.getTime()) && date === parsed.toISOString().split("T")[0]
  );
};
