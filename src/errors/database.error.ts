export class DatabaseError extends Error {
  constructor(
    public readonly original: unknown,
    public readonly query: string,
    public readonly params?: unknown[],
  ) {
    super("Database query failed");
    this.name = "DatabaseError";
    Error.captureStackTrace(this, this.constructor);
  }
}
