import { query } from "@/db/postgres";
import { buildUpdateQuery } from "@/db/postgres/build-update-query.helper";
import { CreateUserDTO, UpdateUserDTO, UserBalanceDTO } from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import { IUserRepository } from "@/repositories/types/user.repository";

export class UserPostgresRepository implements IUserRepository {
  constructor(private readonly db = query) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.db("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  async create(user: CreateUserDTO): Promise<UserEntity> {
    await this.db(
      `INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`,
      [user.id, user.first_name, user.last_name, user.email, user.password],
    );

    const result = await this.db("SELECT * FROM users WHERE id = $1", [
      user.id,
    ]);
    return result.rows[0];
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await this.db("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  async update(data: UpdateUserDTO): Promise<UserEntity | null> {
    const { query, values } = buildUpdateQuery("users", "id", data);
    const result = await this.db(query, values);
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.db("DELETE FROM users WHERE id = $1", [id]);
  }

  async findAll(): Promise<UserEntity[]> {
    const result = await this.db("SELECT * FROM users");
    return result.rows;
  }

  async balance(id: string): Promise<UserBalanceDTO> {
    const result = await this.db(`SELECT * FROM get_user_balance($1)`, [id]);
    return { user_id: id, ...result.rows[0] };
  }
}
