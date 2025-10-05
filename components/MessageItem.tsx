"use client";
import React from "react";
import { Message } from "../lib/types";
import clsx from "clsx";
import Image from "next/image";

export default function MessageItem({ msg }: { msg: Message }) {
  const time = new Date(msg.createdAt).toLocaleTimeString();
  return (
    <div className={clsx("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
      <div className={clsx("max-w-[70%] p-3 rounded-lg", msg.sender === "user" ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-900")}>
        {msg.text && <div className="whitespace-pre-wrap">{msg.text}</div>}
        {msg.imageBase64 && <Image src={msg.imageBase64} alt="uploaded" className="mt-2 rounded max-h-60" />}
        <div className="text-xs mt-2 text-slate-400 flex items-center justify-between">
          <span>{time}</span>
          <button onClick={() => navigator.clipboard.writeText(msg.text || msg.imageBase64 || '')} aria-label="Copy message" className="ml-2">Copy</button>
        </div>
      </div>
    </div>
  );
}
