import "dotenv/config";

import express from "express";
import userRoutes from "@/routes/user.routes";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
