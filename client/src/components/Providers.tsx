"use client";

// Providers.tsx — Client-side providers wrapper
// Wraps theme provider and toaster for the Next.js App Router

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
