import { Router } from "express";

import { makeCreateTransactionController } from "@/factories/transaction/create-transaction.factory";
import { makeDeleteTransactionController } from "@/factories/transaction/delete-transaction.factory";
import { makeGetAllTransactionsController } from "@/factories/transaction/get-all-transactions.factory";
import { makeGetTransactionByIdController } from "@/factories/transaction/get-by-id-transaction.factory";
import { makeUpdateTransactionController } from "@/factories/transaction/update-transaction.factory";

const router = Router();

router.get("/", async (req, res) => {
  await makeGetAllTransactionsController().execute(res);
});

router.post("/", async (req, res) => {
  await makeCreateTransactionController().execute(req, res);
});

router.get("/:transactionId", async (req, res) => {
  await makeGetTransactionByIdController().execute(req, res);
});

router.patch("/:transactionId", async (req, res) => {
  await makeUpdateTransactionController().execute(req, res);
});

router.delete("/:transactionId", async (req, res) => {
  await makeDeleteTransactionController().execute(req, res);
});

export default router;
