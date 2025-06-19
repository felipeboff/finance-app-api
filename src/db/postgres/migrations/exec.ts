import "dotenv/config";

import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { pool } from "../pool";

// @ts-expect-error: import alias not resolved by TS, but works with tsx
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const exec = async () => {
  const scriptPath = join(__dirname, "01-init.sql");
  const script = fs.readFileSync(scriptPath, "utf8");

  const client = await pool.connect();
  try {
    await client.query(script);
    console.log("Migration executed successfully");
  } finally {
    client.release();
  }
};

exec();
