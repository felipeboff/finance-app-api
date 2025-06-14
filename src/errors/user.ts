export class EmailAlreadyExistsError extends Error {
  constructor(email: string) {
    super(`The email '${email}' already exists`);
    this.name = "EmailAlreadyExistsError";
  }
}
