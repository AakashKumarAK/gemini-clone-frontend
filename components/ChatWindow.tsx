"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useChatStore } from "../lib/zustandStore";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";
import SkeletonMessage from "./SkeletonMessage";
import toast from "react-hot-toast";
import { Message } from "../lib/types";

type Props = { roomId: string };

const PAGE_SIZE = 20;

// Define Message type


export default function ChatWindow({ roomId }: Props) {
  const chatrooms = useChatStore((s) => s.chatrooms);
  const addMessage = useChatStore((s) => s.addMessage);

  const room = chatrooms.find((r) => r.id === roomId);

  const [page, setPage] = useState(1); // page=1 newest messages
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const lastResponseRef = useRef<number>(0); // throttle responses

  // Update visible messages when room messages or page change
  useEffect(() => {
    if (!room) return;
    const total = room.messages.length;
    const start = Math.max(0, total - page * PAGE_SIZE);
    const end = total;
    setVisibleMessages(room.messages.slice(start, end));

    // scroll to bottom after update
    setTimeout(
      () =>
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        }),
      50
    );
  }, [room, page]);

  // Load older messages (pagination)
  const loadOlder = useCallback(async () => {
    if (!room) return;
    const total = room.messages.length;
    const canLoad = total > page * PAGE_SIZE;
    if (!canLoad) return;

    setLoadingOlder(true);
    await new Promise((r) => setTimeout(r, 700)); // simulate fetch delay
    setPage((p) => p + 1);
    setLoadingOlder(false);
  }, [room, page]);

  // Reverse infinite scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (container.scrollTop < 60) {
        loadOlder();
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [loadOlder]);

  // Send user message
  const sendUserMessage = async (text?: string, imageBase64?: string) => {
    if (!room) {
      toast.error("Room missing");
      return;
    }
    addMessage(room.id, { sender: "user", text, imageBase64 });
    scheduleGeminiReply(room.id, text);
  };

  // Throttled Gemini reply simulation
  const scheduleGeminiReply = (rId: string, userText?: string) => {
    const now = Date.now();
    const since = now - lastResponseRef.current;
    const minInterval = 3000; // 3s between responses

    const processReply = () => {
      setIsTyping(true);
      const typingTime = 1200 + Math.random() * 1000; // 1.2s-2.2s
      setTimeout(() => {
        const replyText = `Echo: ${userText || "I got your image"} - (simulated reply)`;
        addMessage(rId, { sender: "gemini", text: replyText });
        setIsTyping(false);
        lastResponseRef.current = Date.now();
      }, typingTime);
    };

    if (since > minInterval) {
      setTimeout(processReply, 600);
    } else {
      const wait = minInterval - since + 600;
      setTimeout(processReply, wait);
    }
  };

  if (!room) return <div className="p-4">Chatroom not found</div>;

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded shadow">
      {/* Header */}
      <div className="px-4 py-3 border-b dark:border-slate-700 flex justify-between items-center">
        <div>
          <div className="font-semibold text-slate-800 text-lg">{room.title}</div>
          <div className="text-xs text-slate-500">{room.messages.length} messages</div>
        </div>
      </div>

      {/* Message container */}
      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-4 space-y-3">
        {loadingOlder && (
          <div className="flex flex-col gap-2">
            <SkeletonMessage align="left" />
            <SkeletonMessage align="right" />
            <SkeletonMessage align="left" />
          </div>
        )}

      {visibleMessages.map((m: Message) => (
  <MessageItem key={m.id} msg={m} />
))}

        {isTyping && <div className="text-sm text-slate-500">Gemini is typing...</div>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t dark:border-slate-700">
        <MessageInput onSend={sendUserMessage} />
      </div>
    </div>
  );
}
