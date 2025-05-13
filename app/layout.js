'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '../src/hooks/useAuth';
import './globals.css';

import Sidebar from '../src/components/layout/Sidebar';
import Navbar from '../src/components/layout/Navbar';
import { usePathname } from 'next/navigation';
import { Toaster } from '../src/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Employee Management System</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          {isLoginPage ? (
            children
          ) : (
            <div className="flex h-screen overflow-hidden bg-background">
              <Sidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
              </div>
            </div>
          )}

   
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
