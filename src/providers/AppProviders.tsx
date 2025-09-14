/**
 * App Providers
 * Combines all context providers in the correct order
 */

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, AuthProvider, ColorThemeProvider } from "../contexts";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "../lib/query-client";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ColorThemeProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ColorThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
