"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LogOut, AlertCircle, User, ChevronDown } from "lucide-react";
import { authApi } from "../lib/api";
import { ButtonLoader } from "./Loader";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const [isMockMode, setIsMockMode] = useState(false);

  useEffect(() => {
    setIsMockMode(authApi.isMockMode());
  }, []);

  if (isLoading) {
    return (
      <header className="w-full px-4 sm:px-8 py-4 relative z-20 sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between glass-effect rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500/60 to-pink-500/60 flex items-center justify-center text-xs font-semibold text-white">
              IA
            </div>
            <span className="text-base font-semibold gradient-text">
              IntervAI
            </span>
          </div>
          <ButtonLoader className="border-purple-400 border-t-white" />
        </div>
      </header>
    );
  }

  return (
    <header className="w-full px-4 sm:px-8 py-4 relative z-20 sticky top-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-effect rounded-2xl px-4 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500/60 to-pink-500/60 flex items-center justify-center text-xs font-semibold text-white group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all">
            IA
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold gradient-text">
              IntervAI
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isMockMode && (
            <div
              className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs"
              title="Using mock authentication - backend not connected"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Mock Mode</span>
            </div>
          )}

          <Link
            href="/interview"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 text-sm font-semibold text-white shadow-md transition-all"
          >
            AI Interview
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                  {(user.fullName?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                </div>
                <span className="text-sm text-gray-300 hidden sm:block">
                  {user.fullName || user.email}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl border border-purple-400/30 text-sm font-medium text-purple-300 hover:text-white hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
