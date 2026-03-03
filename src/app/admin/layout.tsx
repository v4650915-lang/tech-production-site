"use client";

import React from "react";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-stone-50">
        {children}
      </div>
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}
