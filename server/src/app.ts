import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
// import * as pdfParse from "pdf-parse";
import upload from "./utils/fileUploads.js";
import interviewRouter from "./features/interview/interview.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Server running" });
});

app.post(
  "/upload-resume",
  upload.single("resume"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File not uploaded" });
      }

      const buffer = fs.readFileSync(req.file.path);
      const parsed = await pdfParse(buffer);

      const keywords = extractKeyword(parsed.text);

      return res.status(200).json({ keywords });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

const extractKeyword = (text: string): string[] => {
  const words: string[] = text
    .toLowerCase()
    .split(/\W+/);

  const frequency: Record<string, number> = {};

  const stopWords = new Set([
    "the", "is", "a", "an", "and", "or", "to", "of", "in", "for", "with",
    "on", "at", "by", "as", "be", "this", "that", "from", "are", "was",
    "were", "been", "have", "has", "had", "do", "does", "did", "will",
    "would", "could", "should", "may", "might", "must", "can", "it", "its",
    "based"
  ]);

  words.forEach((word) => {
    if (!word) return;
    if (stopWords.has(word)) return;

    frequency[word] = (frequency[word] ?? 0) + 1;
  });

  return Object.keys(frequency)
    .sort((a, b) => (frequency[b] ?? 0) - (frequency[a] ?? 0))
    .slice(0, 10);
};

app.use('/api/interview', interviewRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
