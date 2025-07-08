import "dotenv/config";

import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DATABASE_URL!);

async function testConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Conexão com o banco de dados bem-sucedida.");
  } catch {
    console.error("Falha na conexão com o banco de dados:");
  }
}
testConnection();
