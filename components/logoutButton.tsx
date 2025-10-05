"use client";
import React from "react";
import { useAuthStore } from "../lib/zustandStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);
  const loggedIn = useAuthStore((s) => s.loggedIn);
  const router = useRouter();

  if (!loggedIn) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    router.replace("/auth");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 font-semibold hover:bg-slate-100 text-slate-800  dark:hover:bg-slate-800"
    >
      Logout
    </button>
  );
}
