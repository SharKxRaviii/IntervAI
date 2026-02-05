import express from "express";
import { keywordExtractor } from "./keyword.controller.js";
import upload from "../../utils/fileUploads.js";

const keywordRouter = express.Router();

keywordRouter.post("/", upload.single("resume"), keywordExtractor);

export default keywordRouter;