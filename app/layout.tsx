"use client";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import DarkToggle from "../components/DarkToggle";
import Link from "next/link";
import LogoutButton from "@/components/logoutButton";

export default function RootLayout({ children }: { children: React.ReactNode }) {

 
 
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="p-4 border-b dark:border-slate-700 bg-white theme dark:bg-slate-900 shadow">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/dashboard">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Gemini Clone</h1>
              </Link>
              <div className="flex items-center gap-4">
                <DarkToggle />
                <LogoutButton />
              </div>
            </div>
          </header>

          <main className="flex-1 py-6 px-[18px]">{children}</main>
          <Toaster position="top-right" />
        </div>
      </body>
    </html>
  );
}
