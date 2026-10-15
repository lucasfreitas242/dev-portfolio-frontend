"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminIndexPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/admin/drafts");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return null;
}
