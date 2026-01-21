import type { ROLE, CHAT, INTERVIEWSESSION } from "./interview.model.js";
import crypto from 'crypto';

export class InterviewAI {
    private interview:INTERVIEWSESSION;

    constructor (userId: string) {
        this.interview = {
            id: crypto.randomUUID(),
            userId,
            chats: [],
            startedAt: new Date(),
            status: "active"
        }
    }

    addMessage(role: ROLE, content: "string") {
        const chat:CHAT = {
            id: crypto.randomUUID(),
            role: role,
            content:content,
            timestamp: new Date()
        }

        this.interview.chats.push(chat);
    }

    getInterview (): INTERVIEWSESSION {
        return this.interview
    }
}