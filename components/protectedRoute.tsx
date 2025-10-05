"use client";

import { useEffect } from "react";
import { useAuthStore } from "../lib/zustandStore";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const loggedIn = useAuthStore((s) => s.loggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.replace("/auth");
    }
  }, [loggedIn, router]);

  if (!loggedIn) {
    return <div className="p-4">Redirecting...</div>;
  }

  return <>{children}</>;
}
