import { query } from "@/db/postgres";
import { UserEntity } from "@/entities/user.entity";

export class UserPostgresRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await query(
      `INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`,
      [user.id, user.firstName, user.lastName, user.email, user.password],
    );

    const result = await query("SELECT * FROM users WHERE id = $1", [user.id]);
    return result.rows[0];
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  }
}
