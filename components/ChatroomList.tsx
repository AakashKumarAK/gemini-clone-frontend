"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useChatStore } from "../lib/zustandStore";
import DeleteChatRoom from "./DeleteChatRoom";

export default function ChatroomList({ searchQuery }: { searchQuery: string }) {
  const chatrooms = useChatStore((s) => s.chatrooms);

  const filtered = chatrooms.filter((room) =>
    room.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!filtered.length) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400 py-8">
        No chatrooms found
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {filtered.map((room) => (
        <li
          key={room.id}
          className="bg-white dark:bg-slate-800 p-3 rounded flex justify-between items-center hover:shadow"
        >
          <Link href={`/chat/${room.id}`} className="flex-1">
            <div className="font-medium text-slate-800 dark:text-slate-100">
              {room.title}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {room.messages.length} messages
            </div>
          </Link>
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  location.origin + "/chat/" + room.id
                );
                toast.success("Link copied");
              }}
              aria-label="Copy link"
              className="text-sm text-indigo-600 dark:text-indigo-400"
            >
              Copy
            </button>
            <DeleteChatRoom id={room.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
