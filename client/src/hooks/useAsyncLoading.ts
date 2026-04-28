"use client";

import { useCallback } from "react";
import { useLoading } from "../context/LoadingContext";

export function useAsyncLoading() {
  const { showLoader, hideLoader, setLoadingText } = useLoading();

  const withLoading = useCallback(
    async <T,>(
      asyncFunction: () => Promise<T>,
      options?: {
        loadingText?: string;
        successText?: string;
        errorText?: string;
      }
    ): Promise<T> => {
      try {
        if (options?.loadingText) {
          setLoadingText(options.loadingText);
        }
        showLoader();

        const result = await asyncFunction();

        return result;
      } finally {
        hideLoader();
      }
    },
    [showLoader, hideLoader, setLoadingText]
  );

  return { withLoading, showLoader, hideLoader, setLoadingText };
}
