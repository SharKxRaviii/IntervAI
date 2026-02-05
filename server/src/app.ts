import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import interviewRouter from "./features/interview/interview.routes.js";
import keywordRouter from "./features/keyword-extract/keyword.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server running" });
});

app.use("/api/upload-resume", keywordRouter);
app.use('/api/interview', interviewRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
