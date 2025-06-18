import { Router } from "express";
import { makeCreateTransactionController } from "@/factories/transaction/create-transaction.factory";

const router = Router();

router.post("/", async (req, res) => {
  await makeCreateTransactionController().execute(req, res);
});

export default router;
