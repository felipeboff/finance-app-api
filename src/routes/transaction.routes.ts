import { Router } from "express";

import { makeCreateTransactionController } from "@/factories/transaction/create-transaction.factory";
import { makeGetAllTransactionsController } from "@/factories/transaction/get-all-transactions.factory";
import { makeUpdateTransactionController } from "@/factories/transaction/update-transaction.factory";

const router = Router();

router.get("/", async (req, res) => {
  await makeGetAllTransactionsController().execute(res);
});

router.post("/", async (req, res) => {
  await makeCreateTransactionController().execute(req, res);
});

router.patch("/:transactionId", async (req, res) => {
  await makeUpdateTransactionController().execute(req, res);
});

export default router;
