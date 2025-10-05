"use client";
import React, { useState } from "react";
import { useChatStore } from "../lib/zustandStore";
import toast from "react-hot-toast";

export default function NewChatroomDialog() {
  const createChatroom = useChatStore((s) => s.createChatroom);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    createChatroom(title.trim());
    toast.success("Chatroom created");
    setTitle("");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        New
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
              Create New Chatroom
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Chatroom title"
              className="w-full px-3 py-2 border rounded dark:bg-slate-700 text-slate-800 dark:text-white dark:border-slate-600"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded dark:border-slate-600 text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
