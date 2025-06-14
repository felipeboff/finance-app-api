import { query } from "@/db/postgres";
import { UserInput } from "@/use-cases/create-user";

export class GetUserByIdRepository {
  async execute(userId: string): Promise<UserInput> {
    const user = await query("SELECT * FROM users WHERE id = $1", [userId]);
    return user.rows[0];
  }
}
