import type { ROLE } from "./interview.model.js";
import { InterviewRepo } from "./interview.repo.js";

export class InterviewService {
    private interviewRepo = new InterviewRepo();

    async startInterview (user_id: number) {
        const result = await this.interviewRepo.createInterview(user_id);
        return result;
    }

    async sendMessage (interview_id: number, role: ROLE, content: string) {
        // save response
        await this.interviewRepo.insertMessage(interview_id, role, content);

        // get previous message for context
        const chats = await this.interviewRepo.fetchMessages(interview_id);

        // Format for AI
        const messages = chats.map(c => ({
            role: c.role,
            content: c.content
        }));

        // call AI
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                // ai api_key = process.env.GROQ_API_KEY
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages
            })
        });

        const data = await response.json();
        const aiReply = data.choices[0].message.content;

        // Save AI response
        await this.interviewRepo.insertMessage(interview_id, "ai", aiReply);

        // return ai reply
        return aiReply;      
    }

    async getAllConversation (interview_id: number) {
        const result = await this.interviewRepo.fetchMessages(interview_id);
        return result;
    }

    async endInterview (id: number) {
        const result = await this.interviewRepo.endInterview(id);
        return result;
    }
}