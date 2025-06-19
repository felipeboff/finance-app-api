import pg from "pg";

const { Pool, types } = pg;

types.setTypeParser(1700, (val) => parseFloat(val));

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});
