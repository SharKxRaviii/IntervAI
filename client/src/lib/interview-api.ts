import { api } from "./api";

export interface Interview {
  id: number;
  user_id: number;
  started_at: string;
  status: "active" | "completed";
}

export interface ChatMessage {
  id: number;
  interview_id: number;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

export interface StartInterviewResponse {
  message: string;
  result: Interview;
}

export interface SendMessageResponse {
  message: string;
}

export interface GetMessagesResponse {
  messages: ChatMessage[];
}

export interface EndInterviewResponse {
  message: string;
  end: Interview;
}

export const interviewApi = {
  startInterview: async (): Promise<StartInterviewResponse> => {
    const response = await api.post<StartInterviewResponse>("/interview/start");
    return response.data;
  },

  sendMessage: async (interviewId: number, content: string): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>(`/interview/${interviewId}`, { content });
    return response.data;
  },

  getAllMessages: async (interviewId: number): Promise<GetMessagesResponse> => {
    const response = await api.get<GetMessagesResponse>(`/interview/${interviewId}`);
    return response.data;
  },

  endInterview: async (interviewId: number): Promise<EndInterviewResponse> => {
    const response = await api.post<EndInterviewResponse>(`/interview/${interviewId}/end`);
    return response.data;
  },
};
