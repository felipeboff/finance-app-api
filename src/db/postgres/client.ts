import { QueryResult } from "pg";
import { pool } from "./pool";

export const query = async (
  sql: string,
  params?: unknown[],
): Promise<QueryResult> => {
  const client = await pool.connect();
  try {
    return await client.query(sql, params);
  } finally {
    client.release();
  }
};
