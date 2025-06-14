import bcrypt from "bcrypt";

export const hashPassword = async (plain: string): Promise<string> =>
  bcrypt.hash(plain + process.env.PASSWORD_SECRET, 10);

export const comparePassword = async (
  plain: string,
  hashed: string,
): Promise<boolean> =>
  bcrypt.compare(plain + process.env.PASSWORD_SECRET, hashed);
