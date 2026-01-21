export type ROLE = "user" | "ai";

export interface CHAT {
    id: string;
    role: ROLE;
    content: string;
    timestamp: Date;
}

export interface INTERVIEWSESSION {
    id: string;
    userId: string;
    chats: CHAT[];
    startedAt: Date;
    status: "active" | "completed";
}

export const interviews:INTERVIEWSESSION[] = [];