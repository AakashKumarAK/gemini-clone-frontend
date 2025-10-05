"use client";
import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function DarkToggle() {
  // Persist dark mode preference in localStorage
  const [dark, setDark] = useLocalStorage("theme", false);

  useEffect(() => {
    // Apply theme class to <html>
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className="px-3 py-1 text-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white"
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
