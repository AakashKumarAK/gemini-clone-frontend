import { Chatroom, Message } from "./types";
import { nanoid } from "nanoid";

export const createDummyMessages = (count=60) => {
  const msgs: Message[] = [];
  const now = Date.now();
  for (let i = count-1; i >= 0; i--) {
    msgs.push({
      id: `m-${i}`,
      text: `This is older message #${i+1}`,
      sender: i % 3 === 0 ? "gemini" : "user",
      createdAt: now - i*60*1000
    });
  }
  return msgs;
}

export const sampleChatroom = (): Chatroom => ({
  id: "room-1",
  title: "Personal Assistant",
  createdAt: Date.now(),
  messages: createDummyMessages(34)
});
