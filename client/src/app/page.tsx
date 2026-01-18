"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeUploader from "../components/ResumeUploader";
// import ResumeUploader from "@/components/ResumeUploader";
// import KeywordDisplay from "@/components/KeywordDisplay";
import KeywordDisplay from "../components/KeywordDisplay";
// import Background from "@/components/Background";
import Background from "../components/Background";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [keywords, setKeywords] = useState<string[] | null>(null);

  const handleReset = () => {
    setKeywords(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      <Background />
      
      <div className="w-full max-w-6xl mx-auto space-y-8 relative z-10">
        <AnimatePresence mode="wait">
          {!keywords ? (
            <motion.div
              key="uploader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center"
            >
              <ResumeUploader onKeywordsExtracted={setKeywords} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Analysis Complete</span>
                </div>
              </motion.div>

              <div className="flex items-center justify-center">
                <KeywordDisplay keywords={keywords} />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl glass-effect hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
                >
                  Analyze Another Resume
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-4 text-center text-sm text-gray-500"
      >
        Powered by AI • Built with Next.js
      </motion.footer>
    </main>
  );
}