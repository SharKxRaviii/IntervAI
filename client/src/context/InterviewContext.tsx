"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { interviewApi, Interview, ChatMessage } from "../lib/interview-api";

interface InterviewContextType {
  currentInterview: Interview | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isStarting: boolean;
  isEnding: boolean;
  error: string | null;
  startInterview: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  endInterview: () => Promise<void>;
  clearInterview: () => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startInterview = useCallback(async () => {
    setIsStarting(true);
    setError(null);
    try {
      const response = await interviewApi.startInterview();
      setCurrentInterview(response.result);
      setMessages([]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to start interview");
      throw err;
    } finally {
      setIsStarting(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentInterview) {
      setError("No active interview");
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now(),
      interview_id: currentInterview.id,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      await interviewApi.sendMessage(currentInterview.id, content);
      const { messages: updatedMessages } = await interviewApi.getAllMessages(currentInterview.id);
      setMessages(updatedMessages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send message");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentInterview]);

  const endInterview = useCallback(async () => {
    if (!currentInterview) {
      setError("No active interview");
      return;
    }

    setIsEnding(true);
    setError(null);

    try {
      await interviewApi.endInterview(currentInterview.id);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to end interview");
      throw err;
    } finally {
      setIsEnding(false);
    }
  }, [currentInterview]);

  const clearInterview = useCallback(() => {
    setCurrentInterview(null);
    setMessages([]);
    setError(null);
  }, []);

  return (
    <InterviewContext.Provider
      value={{
        currentInterview,
        messages,
        isLoading,
        isStarting,
        isEnding,
        error,
        startInterview,
        sendMessage,
        endInterview,
        clearInterview,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
}
