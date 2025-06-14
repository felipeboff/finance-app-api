import { Router } from "express";
import { createUserController } from "@/controllers/user/create-user.controller";
import { getUserByIdController } from "@/controllers/user/get-user-by-id.controller";

const router = Router();

router.post("/users", async (req, res) => {
  await createUserController(req, res);
});
router.get("/users/:userId", async (req, res) => {
  await getUserByIdController(req, res);
});

export default router;
