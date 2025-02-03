// app/layout.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
const queryClient = new QueryClient();

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="no-scrollbar">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
