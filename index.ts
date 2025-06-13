import "dotenv/config";
import express from "express";

import { query } from "@/db/postgres";

const app = express();

app.get("/", async (req, res) => {
  const result = await query("SELECT * FROM users");
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
