import { Router } from "express";

import { makeCreateUserController } from "@/factories/user/create-user.factory";
import { makeGetUserByIdController } from "@/factories/user/get-user-by-id.factory";
import { makeUpdateUserController } from "@/factories/user/update-user.factory";

const router = Router();

router.post("/users", async (req, res) => {
  await makeCreateUserController().execute(req, res);
});
router.get("/users/:userId", async (req, res) => {
  await makeGetUserByIdController().execute(req, res);
});
router.patch("/users/:userId", async (req, res) => {
  await makeUpdateUserController().execute(req, res);
});

export default router;
