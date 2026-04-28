"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "pulse" | "dots" | "ring";
  className?: string;
  text?: string;
}

const sizeMap = {
  sm: { container: "w-6 h-6", text: "text-xs" },
  md: { container: "w-10 h-10", text: "text-sm" },
  lg: { container: "w-16 h-16", text: "text-base" },
  xl: { container: "w-24 h-24", text: "text-lg" },
};

export default function Loader({
  size = "md",
  variant = "ring",
  className = "",
  text,
}: LoaderProps) {
  const { container, text: textSize } = sizeMap[size];

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <motion.div
            className={`${container} rounded-full border-2 border-purple-500/20 border-t-purple-500 border-r-pink-500`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );

      case "pulse":
        return (
          <div className="relative">
            <motion.div
              className={`${container} rounded-full bg-gradient-to-r from-purple-500 to-pink-500`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className={`absolute inset-0 ${container} rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl`}
              animate={{
                scale: [1.2, 1.5, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );

      case "dots":
        return (
          <div className={`flex items-center gap-1 ${container}`}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        );

      case "ring":
      default:
        return (
          <div className={`relative ${container}`}>
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-pink-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent border-t-pink-500 border-l-purple-500"
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Inner dot */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      {renderLoader()}
      {text && (
        <motion.p
          className={`${textSize} text-gray-400 font-medium`}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Full screen loader for page transitions
export function FullScreenLoader({
  text = "Loading...",
  variant = "ring",
}: {
  text?: string;
  variant?: LoaderProps["variant"];
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo animation */}
        <motion.div
          className="h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-2xl shadow-purple-500/30"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          IA
        </motion.div>

        <Loader size="lg" variant={variant} />

        {text && (
          <motion.p
            className="text-gray-400 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.p>
        )}
      </div>

      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

// Button loader - compact for button usage
export function ButtonLoader({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`w-5 h-5 rounded-full border-2 border-white/30 border-t-white ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// Skeleton loader for content placeholders
export function SkeletonLoader({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-white/10 rounded-lg"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Page content loader with overlay
export function PageContentLoader({
  isLoading,
  children,
  text = "Loading content...",
}: {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
}) {
  return (
    <div className="relative">
      {children}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm rounded-xl"
        >
          <Loader size="md" text={text} />
        </motion.div>
      )}
    </div>
  );
}
