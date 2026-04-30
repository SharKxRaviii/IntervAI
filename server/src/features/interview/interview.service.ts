import type { ROLE } from "./interview.model.js";
import { InterviewRepo } from "./interview.repo.js";

export class InterviewService {
    private interviewRepo = new InterviewRepo();

    async startInterview (user_id: number) {
        const result = await this.interviewRepo.createInterview(user_id);
        return result;
    }

    async sendMessage (interview_id: number, content: string) {
        // Save user message
        await this.interviewRepo.insertMessage(interview_id, "user", content);

        // get previous message for context
        const chats = await this.interviewRepo.fetchMessages(interview_id);

        // Format for AI - map "ai" role to "assistant" and add system prompt
        const systemPrompt = {
            role: "system",
            content: `You are an experienced technical interviewer conducting a job interview. Your role is to:
- Ask relevant technical and behavioral questions based on the candidate's responses
- Evaluate responses professionally and provide constructive feedback
- Maintain a professional, encouraging tone
- Ask follow-up questions to dig deeper into their experience
- Focus on assessing problem-solving skills, technical knowledge, and cultural fit
- Keep responses concise but informative

Start by asking about their background and experience, then progress to technical questions based on their stated expertise. Be adaptive and natural in the conversation.`
        };

        const messages = [
            systemPrompt,
            ...chats.map(c => ({
                role: c.role === "ai" ? "assistant" : c.role,
                content: c.content
            }))
        ];

        // call AI
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY not configured");
        }
        
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || `AI API error: ${response.status}`);
        }
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error("No response from AI");
        }
        
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