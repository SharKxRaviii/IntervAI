"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  MoreVertical,
  Square,
  Sparkles,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  X,
  Zap,
  Target,
  Brain,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { InterviewProvider, useInterview } from "../../context/InterviewContext";
import type { ChatMessage } from "../../lib/interview-api";
import Loader, { ButtonLoader } from "../../components/Loader";
import { formatDistanceToNow } from "../../lib/utils";

function InterviewContent() {
  const {
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
  } = useInterview();

  const [inputMessage, setInputMessage] = useState("");
  const [showEndDialog, setShowEndDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage("");
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEndInterview = async () => {
    await endInterview();
    setShowEndDialog(false);
    clearInterview();
  };

  if (!currentInterview) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-5xl w-full">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px]"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Hero Section */}
          <div className="relative text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="inline-flex items-center justify-center w-32 h-32 mb-8 relative"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl animate-pulse" />
              <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <Brain className="w-14 h-14 text-white" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
                  AI Interview
                </span>
                <br />
                <span className="text-white">Preparation</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Master your next interview with our intelligent AI interviewer.
              <br className="hidden md:block" />
              Practice anytime, get instant feedback, and land your dream job.
            </motion.p>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { icon: Users, value: "10K+", label: "Users Practicing" },
              { icon: Target, value: "95%", label: "Success Rate" },
              { icon: Award, value: "50+", label: "Interview Topics" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-white/10"
              >
                <stat.icon className="w-5 h-5 text-purple-400" />
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: MessageSquare,
                title: "Natural Conversation",
                desc: "Engage in realistic, adaptive interview dialogue that feels human",
                gradient: "from-blue-500/20 to-purple-500/20",
                iconColor: "text-blue-400",
              },
              {
                icon: TrendingUp,
                title: "Real-time Feedback",
                desc: "Get instant insights on your responses and areas for improvement",
                gradient: "from-purple-500/20 to-pink-500/20",
                iconColor: "text-purple-400",
              },
              {
                icon: Zap,
                title: "Practice Anytime",
                desc: "24/7 availability with unlimited sessions to perfect your skills",
                gradient: "from-pink-500/20 to-orange-500/20",
                iconColor: "text-pink-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-3xl glass-effect border border-white/10 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startInterview}
              disabled={isStarting}
              className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isStarting ? (
                <>
                  <ButtonLoader className="border-white border-t-transparent" />
                  <span>Launching Interview...</span>
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current" />
                  <span>Start Your Interview</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-sm text-gray-500"
            >
              Takes just 2 minutes to set up • No credit card required
            </motion.p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-5rem)] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Premium Chat Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 py-4 glass-effect border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <motion.div 
                className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0a0a0a]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white">AI Interviewer</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Pro</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <p className="text-xs text-green-400 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Active Now
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div 
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-white/5"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">{formatDistanceToNow(currentInterview.started_at)}</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEndDialog(true)}
              disabled={isEnding}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-gray-400 transition-all disabled:opacity-50"
            >
              <Square className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium hidden sm:inline">End</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Premium Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center"
              >
                <Sparkles className="w-12 h-12 text-purple-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Interview Started</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Your AI interviewer is ready. Introduce yourself and share what position you're preparing for.
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((message: ChatMessage, index: number) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[90%] sm:max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  } flex items-end gap-3`}
                >
                  {/* Premium Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-purple-600 to-pink-600 shadow-purple-500/30"
                        : "bg-gradient-to-br from-blue-600 to-purple-600 shadow-blue-500/30"
                    }`}
                  >
                    {message.role === "user" ? (
                      <span className="text-sm font-bold text-white">You</span>
                    ) : (
                      <Brain className="w-5 h-5 text-white" />
                    )}
                  </motion.div>

                  {/* Premium Message Bubble */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    className={`relative px-5 py-4 rounded-3xl ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-lg shadow-lg shadow-purple-500/20"
                        : "glass-effect text-gray-100 rounded-bl-lg border border-white/10 shadow-xl"
                    }`}
                  >
                    {/* Gradient border effect for AI */}
                    {message.role === "ai" && (
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity -z-10" />
                    )}
                    
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    
                    <div className={`flex items-center gap-2 mt-2 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}>
                      <span
                        className={`text-xs ${
                          message.role === "user" ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {message.role === "user" && (
                        <CheckCircle2 className="w-3 h-3 text-white/70" />
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Premium Typing Indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-3 max-w-[80%]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="glass-effect px-6 py-4 rounded-3xl rounded-bl-lg border border-white/10 shadow-xl">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                        animate={{
                          y: [0, -6, 0],
                          opacity: [0.4, 1, 0.4],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Premium Input Area - Fixed at bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 z-50 px-4 py-5 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
      >
        <div className="max-w-4xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <span>{error}</span>
            </motion.div>
          )}

          <div className="relative flex items-end gap-3 glass-effect rounded-3xl p-2 pr-3 border border-white/10 shadow-2xl">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent border-0 resize-none max-h-32 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none text-sm sm:text-base leading-relaxed"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25 flex items-center justify-center"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <Send className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>
          </div>

          <p className="text-xs text-gray-600 text-center mt-3">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400">Enter</kbd> to send · <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400">Shift</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-400">Enter</kbd> for new line
          </p>
        </div>
      </motion.div>

      {/* Premium End Interview Dialog */}
      <AnimatePresence>
        {showEndDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass-effect rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
              
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center"
                >
                  <Square className="w-10 h-10 text-red-400 fill-current" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  End Session?
                </h3>

                <p className="text-gray-400 mb-8 leading-relaxed">
                  You're about to end this interview session. Your progress will be saved, but you won't be able to resume this specific conversation.
                </p>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEndDialog(false)}
                    className="flex-1 px-5 py-3.5 rounded-2xl border border-white/10 text-gray-300 hover:bg-white/5 transition-all font-medium"
                  >
                    Continue
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEndInterview}
                    disabled={isEnding}
                    className="flex-1 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all disabled:opacity-50"
                  >
                    {isEnding ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Ending...
                      </span>
                    ) : (
                      "End Interview"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InterviewPage() {
  return (
    <ProtectedRoute>
      <InterviewProvider>
        <InterviewContent />
      </InterviewProvider>
    </ProtectedRoute>
  );
}
