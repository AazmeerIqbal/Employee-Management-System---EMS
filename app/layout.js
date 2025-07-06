"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "../src/hooks/useTheme";
import "./globals.css";

import Sidebar from "../src/components/layout/Sidebar";
import Navbar from "../src/components/layout/Navbar";
import { usePathname } from "next/navigation";
import { Toaster } from "../src/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function AppContent({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoginPage = pathname === "/login" || pathname === "/signup";

  // Show loading while session is being fetched
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated and not on login page, redirect to login
  if (status === "unauthenticated" && !isLoginPage) {
    return null; // Will be handled by client-side redirect
  }

  return (
    <>
      {isLoginPage ? (
        children
      ) : (
        <div className="flex h-screen overflow-hidden bg-background">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Employee Management System</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SessionProvider>
            <AppContent>{children}</AppContent>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
