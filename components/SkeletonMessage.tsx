"use client";

import React from "react";
import clsx from "clsx";

export default function SkeletonMessage({ align = "left" }: { align?: "left" | "right" }) {
  return (
    <div
      className={clsx(
        "flex",
        align === "right" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={clsx(
          "h-12 w-40 rounded-lg animate-pulse",
          align === "right"
            ? "bg-indigo-300 dark:bg-indigo-700"
            : "bg-slate-200 dark:bg-slate-700"
        )}
      />
    </div>
  );
}
