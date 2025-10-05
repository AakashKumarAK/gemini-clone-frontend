"use client";

import React, { useState } from "react";

import SearchBar from "@/components/SearchBar";
import NewChatroomDialog from "@/components/NewChatRoomDialog";
import ChatroomList from "@/components/ChatroomList";
import ProtectedRoute from "@/components/protectedRoute";

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  return (
    <ProtectedRoute>
      <div className="p-4 container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold dark:text-white">Chatrooms</h1>
          <NewChatroomDialog />
        </div>

        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <ChatroomList searchQuery={search} />
      </div>
    </ProtectedRoute>
  );
}
