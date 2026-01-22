import type { Request, Response } from "express";
import crypto from 'crypto';
import { startInterview } from "./interview.service.js";

export const startInterviewCntrl = async (req:Request, res:Response) => {
    const userId = crypto.randomUUID();

    try {
        const interview = startInterview(userId);
        res.status(201).json({interview});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to start interview" });
    }
}