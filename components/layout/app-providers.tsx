"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth-context";
import { AuthModal } from "@/components/ui/auth-modal";
import { AuthToast } from "@/components/ui/auth-toast";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
      <AuthToast />
    </AuthProvider>
  );
}
