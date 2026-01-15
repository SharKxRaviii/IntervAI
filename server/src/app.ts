import express from "express";
import type { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({message: ""});
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
