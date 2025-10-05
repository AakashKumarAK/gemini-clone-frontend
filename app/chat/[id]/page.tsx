"use client";

import React from "react";
import { useParams } from "next/navigation";
import ChatWindow from "../../../components/ChatWindow";
import ProtectedRoute from "@/components/protectedRoute";
;

export default function ChatroomPage() {
  const params = useParams();
  const roomId = params?.id as string;

  return (
    <ProtectedRoute>
      <div className="p-4">
        <ChatWindow roomId={roomId} />
      </div>
    </ProtectedRoute>
  );
}
