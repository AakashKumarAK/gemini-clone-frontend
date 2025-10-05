"use client";
import React, { useRef, useState } from "react";

export default function MessageInput({ onSend }: { onSend: (text?:string, imageBase64?:string)=>void }) {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (!text && !imagePreview) return;
    onSend(text || undefined, imagePreview || undefined);
    setText("");
    setImagePreview(null);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-end gap-2 bg-slate-100 text-slate-800 dark:bg-slate-800 rounded-2xl px-3 py-2 shadow-inner">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={1}
        placeholder="Type a message..."
        className="flex-1 bg-transparent resize-none px-2 py-1 focus:outline-none text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileRef}
        onChange={onFileChange}
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
        aria-label="Attach image"
      >
        📎
      </button>
      <button
        onClick={handleSend}
        className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
        aria-label="Send message"
      >
        ➤
      </button>
    </div>
  );
}
