import type { Request, Response } from "express";
import { startInterview } from "./interview.service.js";

export const startInterviewCntrl = async (req:Request, res:Response) => {
    const userId = req.userId?

    try {
        const newInterview = await startInterview(userId);
        res.status(201).json({interview:newInterview});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
}