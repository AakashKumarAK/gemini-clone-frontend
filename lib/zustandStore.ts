import create from "zustand";
import { persist } from "zustand/middleware";
import { Chatroom, Message } from "./types";
import { sampleChatroom } from "./dummy-data";


type AuthState = {
  userPhone?: string;
  loggedIn: boolean;
  login: (phone:string) => void;
  logout: () => void;
};

type ChatState = {
  chatrooms: Chatroom[];
  createChatroom: (title: string) => Chatroom;
  deleteChatroom: (id: string) => void;
  addMessage: (roomId: string, msg: Omit<Message,'id'|'createdAt'>) => Message;
  updateChatroomMessages: (roomId:string, messages: Message[]) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userPhone: undefined,
      loggedIn: false,
      login: (phone) => set({ userPhone: phone, loggedIn: true }),
      logout: () => set({ userPhone: undefined, loggedIn: false })
    }),
    { name: "gemini_auth" }
  )
);

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chatrooms: [ sampleChatroom() ],
      createChatroom: (title) => {
        const newRoom: Chatroom = {
          id: `room-${Date.now()}`,
          title,
          createdAt: Date.now(),
          messages: []
        };
        set(state => ({ chatrooms: [newRoom, ...state.chatrooms] }));
        return newRoom;
      },
      deleteChatroom: (id) => {
        set(state => ({ chatrooms: state.chatrooms.filter(r => r.id !== id) }));
      },
      addMessage: (roomId, msg) => {
        const message: Message = {
          id: `m-${Date.now()}`,
          ...msg,
          createdAt: Date.now()
        };
        set(state => ({
          chatrooms: state.chatrooms.map(r => 
            r.id === roomId ? { ...r, messages: [...r.messages, message] } : r
          )
        }));
        return message;
      },
      updateChatroomMessages: (roomId, messages) => {
        set(state => ({
          chatrooms: state.chatrooms.map(r => r.id === roomId ? { ...r, messages } : r)
        }));
      }
    }),
    { name: "gemini_chats" }
  )
);
