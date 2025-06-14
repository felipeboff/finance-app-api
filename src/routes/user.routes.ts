import { Router } from "express";
import { createUserController } from "@/controllers/user/create-user.controller";
import { getUserByIdController } from "@/controllers/user/get-user-by-id.controller";
import { updateUserController } from "@/controllers/user/update-user.controller";

const router = Router();

router.post("/users", async (req, res) => {
  await createUserController(req, res);
});
router.get("/users/:userId", async (req, res) => {
  await getUserByIdController(req, res);
});
router.patch("/users/:userId", async (req, res) => {
  await updateUserController(req, res);
});

export default router;
