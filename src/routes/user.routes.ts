import { Router } from "express";

import { makeCreateUserController } from "@/factories/user/create-user.factory";
import { makeDeleteUserController } from "@/factories/user/delete-user.factory";
import { makeGetAllUsersController } from "@/factories/user/get-all-users.factory";
import { makeGetUserBalanceController } from "@/factories/user/get-user-balance.factory";
import { makeGetUserByIdController } from "@/factories/user/get-user-by-id.factory";
import { makeUpdateUserController } from "@/factories/user/update-user.factory";

const router = Router();

router.get("/", async (req, res) => {
  await makeGetAllUsersController().execute(res);
});

router.post("/", async (req, res) => {
  await makeCreateUserController().execute(req, res);
});
router.get("/:userId", async (req, res) => {
  await makeGetUserByIdController().execute(req, res);
});
router.patch("/:userId", async (req, res) => {
  await makeUpdateUserController().execute(req, res);
});
router.delete("/:userId", async (req, res) => {
  await makeDeleteUserController().execute(req, res);
});
router.get("/:userId/balance", async (req, res) => {
  await makeGetUserBalanceController().execute(req, res);
});

export default router;
