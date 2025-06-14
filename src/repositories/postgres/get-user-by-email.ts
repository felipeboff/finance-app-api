import { query } from "@/db/postgres";

export class GetUserByEmailRepository {
  async execute(email: string) {
    const user = await query("SELECT * FROM users WHERE email = $1", [email]);
    return user.rows[0];
  }
}
