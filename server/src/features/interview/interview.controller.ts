import type { NextFunction, Request, Response } from "express";
import { InterviewService } from "./interview.service.js";
import { error } from "node:console";

export class InterviewController {
    private interviewService = new InterviewService();

    startInterview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = req.user?._id;
            if (!user_id) throw new Error("Unauthorized");

            const result = await this.interviewService.startInterview(user_id);
            return res.status(201).json({
                message: "Interview Started",
                result
            })
        } catch (error) {
            next(error);
        }
    }

    sendMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const interview_id = Number(req.params.interview_id);
            const {content} = req.body;
            if(!interview_id || !content) throw new Error("Missing fields");

            const message = await this.interviewService.sendMessage(interview_id, content);

            return res.status(201).json({
                message
            })
        } catch (error) {
            next(error);
        }
    }

    getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const interview_id = Number(req.params.interview_id);
            if (!interview_id) throw new Error("Missing interview_id");

            const messages = await this.interviewService.getAllConversation(interview_id);

            return res.status(200).json({
                messages
            })
        } catch (error) {
            next (error);
        }
    }

    endInterview = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const interview_id = Number(req.params.interview_id);
            if(!interview_id) throw new Error("interview_id missing");

            const end = await this.interviewService.endInterview(interview_id);

            return res.status(200).json({
                message: "Interview Completed",
                end
            })
        } catch (error) {
            next(error);
        }
    }
}