import { pool } from "./pool";

export const query = async (
  sql: string,
  params: (string | number | boolean | null)[] = [],
) => {
  const client = await pool.connect();

  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    client.release();
  }
};
