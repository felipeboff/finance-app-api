import "dotenv/config";

import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { pool } from "../pool";

// @ts-expect-error: import alias not resolved by TS, but works with tsx
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const exec = async () => {
  const client = await pool.connect();
  const files = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith(".sql"));

  try {
    for (const file of files) {
      const scriptPath = join(__dirname, file);
      const script = fs.readFileSync(scriptPath, "utf8");

      await client.query(script);
      console.log(`Migration ${file} executed successfully`);
    }

    console.log("All migrations executed successfully");
  } finally {
    client.release();
  }
};

exec();
