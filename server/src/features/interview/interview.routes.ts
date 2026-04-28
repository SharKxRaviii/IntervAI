import express from 'express';
import { InterviewController } from './interview.controller.js';

const interviewRouter = express.Router();
const interviewController = new InterviewController();

interviewRouter.post('/start', interviewController.startInterview);
interviewRouter.post('/:interview_id', interviewController.sendMessage);
interviewRouter.get('/:interview_id', interviewController.getAllMessages);
interviewRouter.post('/:interview_id/end', interviewController.endInterview);

export default interviewRouter;