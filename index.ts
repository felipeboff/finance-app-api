import "dotenv/config";
import express from "express";

import { CreateUserController } from "@/controllers/create-user";
import { GetUserByIdController } from "@/controllers/get-user-by-id";

const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const createUserController = new CreateUserController();
  const result = await createUserController.execute(req);
  res.status(result.status).json(result.body);
});

app.get("/api/users/:userId", async (req, res) => {
  const getUserByIdController = new GetUserByIdController();
  const result = await getUserByIdController.execute(req);
  res.status(Number(result.status)).json(result.body);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
