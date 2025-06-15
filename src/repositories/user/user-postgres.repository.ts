import { query } from "@/db/postgres";
import { UserEntity } from "@/entities/user.entity";

export class UserPostgresRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await query(
      `INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`,
      [user.id, user.first_name, user.last_name, user.email, user.password],
    );

    const result = await query("SELECT * FROM users WHERE id = $1", [user.id]);
    return result.rows[0];
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const result = await query(
      `UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *`,
      [user.first_name, user.last_name, user.email, user.password, user.id],
    );

    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await query("DELETE FROM users WHERE id = $1", [id]);
  }
}
