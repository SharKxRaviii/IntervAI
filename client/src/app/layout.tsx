import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { LoadingProvider } from "../context/LoadingContext";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IntervAI - AI-Powered Interview Preparation",
  description: "Master your interviews with AI-powered resume analysis and interview preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LoadingProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1 flex flex-col">
                {children}
              </div>
            </div>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}