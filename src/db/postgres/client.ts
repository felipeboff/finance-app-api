import { pool } from "./pool";

type QueryParam = string | number | boolean | null;

export const query = async (sql: string, params: QueryParam[] = []) => {
  const client = await pool.connect();
  try {
    return await client.query(sql, params);
  } finally {
    client.release();
  }
};
