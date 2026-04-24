"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { FullScreenLoader } from "../components/Loader";

interface LoadingContextType {
  isLoading: boolean;
  showLoader: (text?: string) => void;
  hideLoader: () => void;
  setLoadingText: (text: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading...");

  const showLoader = useCallback((text?: string) => {
    if (text) setLoadingText(text);
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
    setLoadingText("Loading...");
  }, []);

  const setLoaderText = useCallback((text: string) => {
    setLoadingText(text);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        showLoader,
        hideLoader,
        setLoadingText: setLoaderText,
      }}
    >
      <AnimatePresence>
        {isLoading && <FullScreenLoader text={loadingText} variant="ring" />}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
