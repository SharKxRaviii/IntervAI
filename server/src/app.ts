import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRouter from "./features/interview/interview.routes.js";
import keywordRouter from "./features/keyword-extract/keyword.routes.js";
import { auth } from "./middleware/auth.middleware.js";
import { connectToDB } from "./config/db.js";
import userRouter from "./features/auth/auth.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server running" });
});

app.use("/api/auth", userRouter);
app.use("/api/upload-resume", keywordRouter);
app.use('/api/interview', auth, interviewRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectToDB();
});
