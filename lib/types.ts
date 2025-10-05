export type Message = {
  id: string;
  text?: string;
  imageBase64?: string;
  sender: "user" | "gemini";
  createdAt: number;
};

export type Chatroom = {
  id: string;
  title: string;
  messages: Message[]; // newest last
  createdAt: number;
};
