"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useChatStore } from "../lib/zustandStore";
import { useRouter } from "next/navigation";
import MessageItem from "./MessageItem";
// import MessageInput from "./MessageInput";
import toast from "react-hot-toast";
import MessageInput from "./MessageInput";
import SkeletonMessage from "./SkeletonMessage";

type Props = { roomId: string };

const PAGE_SIZE = 20;

export default function ChatWindow({ roomId }: Props) {
  const router = useRouter();
  const chatrooms = useChatStore(s => s.chatrooms);
  const addMessage = useChatStore(s => s.addMessage);
  const updateChatroomMessages = useChatStore(s => s.updateChatroomMessages);
  const room = chatrooms.find(r => r.id === roomId);

  const [page, setPage] = useState(1); // page=1 newest messages
  const [visibleMessages, setVisibleMessages] = useState<any[]>([]);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  // simple response throttle: lastResponseAt timestamp
  const lastResponseRef = useRef<number>(0);

  // pagination: messages are oldest->newest in room.messages
  useEffect(() => {
    if (!room) return;
    const total = room.messages.length;
    const start = Math.max(0, total - page * PAGE_SIZE);
    const end = total;
    setVisibleMessages(room.messages.slice(start, end));
    // after message change, scroll to bottom
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 50);
  }, [room?.messages.length, page]);

  const loadOlder = async () => {
    if (!room) return;
    const total = room.messages.length;
    const canLoad = total > page * PAGE_SIZE;
    if (!canLoad) return;
    setLoadingOlder(true);
    // simulate remote fetch delay
    await new Promise(r => setTimeout(r, 700));
    setPage(p => p + 1);
    setLoadingOlder(false);
  };

  // scroll listener for reverse infinite scroll
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
  }, [room?.messages.length, page]);

  const sendUserMessage = async (text?:string, imageBase64?:string) => {
    if (!room) { toast.error("Room missing"); return; }
    addMessage(room.id, { sender: "user", text, imageBase64 });
    // schedule Gemini reply with throttle
    scheduleGeminiReply(room.id, text);
  };

  // throttled reply: allow 1 reply every 5 seconds; else queue with delay
  const scheduleGeminiReply = (rId: string, userText?: string) => {
    const now = Date.now();
    const since = now - lastResponseRef.current;
    const minInterval = 3000; // 3s between responses to simulate thinking
    const processReply = () => {
      setIsTyping(true);
      // typing for 1.2s-2.2s
      const typingTime = 1200 + Math.random() * 1000;
      setTimeout(() => {
        // generate a "fake" reply (could be more advanced)
        const replyText = `Echo: ${userText || "I got your image"} - (simulated reply)`;
        addMessage(rId, { sender: "gemini", text: replyText });
        setIsTyping(false);
        lastResponseRef.current = Date.now();
      }, typingTime);
    };
    if (since > minInterval) {
      // respond now (with small delay to show typing)
      setTimeout(processReply, 600);
    } else {
      // schedule after remaining time + small fuzz
      const wait = (minInterval - since) + 600;
      setTimeout(processReply, wait);
    }
  };

  if (!room) return <div className="p-4">Chatroom not found</div>;

  return (
    <div className="flex flex-col h-[80vh] max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded shadow">
      <div className="px-4 py-3 border-b dark:border-slate-700 flex justify-between items-center">
        <div>
          <div className="font-semibold text-slate-800 text-lg">{room.title}</div>
          <div className="text-xs text-slate-500">{room.messages.length} messages</div>
        </div>
      </div>

     <div
  ref={scrollContainerRef}
  className="flex-1 overflow-auto p-4 space-y-3"
>
  {loadingOlder && (
    <div className="flex flex-col gap-2">
      <SkeletonMessage align="left" />
      <SkeletonMessage align="right" />
      <SkeletonMessage align="left" />
    </div>
  )}

  {visibleMessages.map((m) => (
    <MessageItem key={m.id} msg={m} />
  ))}

  {isTyping && (
    <div className="text-sm text-slate-500">Gemini is typing...</div>
  )}

  <div ref={bottomRef} />
</div>


      <div className="p-3 border-t dark:border-slate-700">
        <MessageInput onSend={sendUserMessage} />
      </div>
    </div>
  );
}
