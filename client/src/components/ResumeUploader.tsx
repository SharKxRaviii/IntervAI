"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";
// import type { UploadState, KeywordResponse } from "@/types";
import type { UploadState, KeywordResponse } from "../types";

interface ResumeUploaderProps {
  onKeywordsExtracted: (keywords: string[]) => void;
}

export default function ResumeUploader({ onKeywordsExtracted }: ResumeUploaderProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    keywords: null,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      setUploadState({ ...uploadState, error: "Please upload a PDF file" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadState({ ...uploadState, error: "File size must be less than 10MB" });
      return;
    }
    setSelectedFile(file);
    setUploadState({ ...uploadState, error: null });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("resume", selectedFile);

    setUploadState({ ...uploadState, isUploading: true, error: null });

    try {
      const response = await axios.post<KeywordResponse>(
        `${API_BASE_URL}/api/upload-resume`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadState((prev) => ({ ...prev, progress }));
          },
        }
      );

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        keywords: response.data.keywords,
      });
      onKeywordsExtracted(response.data.keywords);
    } catch (error) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: axios.isAxiosError(error) 
          ? error.response?.data?.message || "Failed to upload resume"
          : "An unexpected error occurred",
        keywords: null,
      });
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      keywords: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4"
          >
            <FileText className="w-12 h-12 text-purple-400" />
          </motion.div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            AI Resume Scan
          </h1>
          <p className="text-gray-400">
            Upload your resume to extract the most important keywords
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/20 hover:border-purple-500/50 hover:bg-white/5"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium text-white mb-2">
                Drop your resume here or click to browse
              </p>
              <p className="text-sm text-gray-400">PDF files only, up to 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
            </motion.div>
          ) : (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{selectedFile.name}</p>
                      <p className="text-sm text-gray-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetUpload}
                    disabled={uploadState.isUploading}
                    className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                {uploadState.isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Uploading...</span>
                      <span className="text-purple-400">{uploadState.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadState.progress}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                disabled={uploadState.isUploading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {uploadState.isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Extract Keywords
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {uploadState.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-400">Error</p>
                <p className="text-sm text-red-300/80">{uploadState.error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}