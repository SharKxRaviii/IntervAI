import express from 'express';
import { startInterviewCntrl } from './interview.controller.js';

const interviewRouter = express.Router();

interviewRouter.post('/', startInterviewCntrl);

export default interviewRouter;