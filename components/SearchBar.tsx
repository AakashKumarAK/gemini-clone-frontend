"use client";
import React from "react";
// import useDebounce from "@/hooks/useDebounce";

export default function SearchBar({ value, onChange }: {value:string; onChange:(v:string)=>void}) {
  // const debounced = useDebounce(value, 400);
  // Parent should read the value prop and filter when debounced changes; to simplify just call onChange as user types
  return (
    <input
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      placeholder="Search chatrooms..."
      className="w-full px-3 py-2 border rounded text-slate-800 dark:text-slate-200 dark:bg-slate-700 dark:border-slate-600"
      aria-label="Search chatrooms"
      
    />
  );
}
