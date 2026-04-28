"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "../context/LoadingContext";

export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showLoader, hideLoader } = useLoading();
  const [isNavigating, setIsNavigating] = useState(false);
  const previousPathRef = useRef(pathname + searchParams?.toString());

  useEffect(() => {
    const currentPath = pathname + (searchParams?.toString() || "");
    
    if (previousPathRef.current !== currentPath && !isNavigating) {
      setIsNavigating(true);
      showLoader("Loading...");
      
      previousPathRef.current = currentPath;
    }
  }, [pathname, searchParams, showLoader, isNavigating]);

  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        hideLoader();
        setIsNavigating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isNavigating, hideLoader]);

  return null;
}
