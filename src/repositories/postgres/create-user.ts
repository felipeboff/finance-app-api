import { query } from "@/db/postgres";
import { CreateUserInput } from "@/use-cases/create-user";

export class PostgresCreateUserRepository {
  async execute(input: CreateUserInput) {
    await query(
      `INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`,
      [input.id, input.firstName, input.lastName, input.email, input.password],
    );

    const createdUser = await query(`SELECT * FROM users WHERE id = $1`, [
      input.id,
    ]);

    return createdUser.rows[0];
  }
}
