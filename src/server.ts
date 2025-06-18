import "dotenv/config";

import express from "express";
import userRoutes from "@/routes/user.routes";
import transactionRoutes from "@/routes/transaction.routes";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
