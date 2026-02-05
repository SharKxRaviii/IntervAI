import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Analyzer - AI Keyword Extraction",
  description: "Extract the most important keywords from your resume using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="w-full px-4 sm:px-8 py-4 relative z-20 sticky top-0">
            <div className="max-w-6xl mx-auto flex items-center justify-between glass-effect rounded-2xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-500/60 to-pink-500/60 flex items-center justify-center text-xs font-semibold text-white">
                  IA
                </div>
                <div className="flex flex-col">
                  {/* <span className="text-sm uppercase tracking-wide text-gray-400">Resume AI</span> */}
                  <span className="text-base font-semibold gradient-text">IntervAI</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/interview"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 text-sm font-semibold text-white shadow-md transition-all"
                >
                  AI Interview
                </Link>
                <Link
                  href="/login" 
                  className="px-4 py-2 rounded-xl border border-purple-400/30 text-sm font-medium text-purple-300 hover:text-white hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 transition-all">
                  Login
                </Link>
                <Link
                  href="/signup" 
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all">
                  Sign up
                </Link>
              </div>
            </div>
          </header>

          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}