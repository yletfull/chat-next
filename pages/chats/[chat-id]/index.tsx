'use client'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Message, Users} from "@/lib/types";
import MessagesView from "@/pages/chats/[chat-id]/components/Messages";
import {defaultMessages} from "@/pages/chats/[chat-id]/mocks";
import InputView from "@/pages/chats/[chat-id]/components/Input";

function ChatView() {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);

  const handleDeleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }
  const handleAddMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: Users.User,
        content: message,
        id: prev[prev.length - 1].id + 1,
        date: new Date(),
      },
    ]);
  };

  return (
    <div className="w-full h-full flex-col justify-between">
      <MessagesView messages={messages} onDeleteMessage={handleDeleteMessage}/>
      <InputView onAddMessage={handleAddMessage} />
    </div>
  );
}

export default ChatView;


