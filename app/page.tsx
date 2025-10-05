"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/zustandStore";

export default function HomePage() {
  const router = useRouter();
  const loggedIn = useAuthStore((s) => s.loggedIn);

  useEffect(() => {
    if (loggedIn) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth");
    }
  }, [loggedIn, router]);

  return (
    <div className="flex items-center justify-center h-[80vh] text-lg text-slate-500">
      Loading...
    </div>
  );
}
