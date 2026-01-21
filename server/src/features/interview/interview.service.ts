import { interviews } from "./interview.model.js";
import { InterviewAI } from "./interview.repo.js";


export const startInterview = (userId:string) => {
    const interview = new InterviewAI(userId);
    interviews.push(interview.getInterview());
    return interview;
}