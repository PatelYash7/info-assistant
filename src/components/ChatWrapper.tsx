"use client";

import { Message, useChat } from "ai/react";
import MessageComponent from "./MessageComponent";
import InputComponent from "./InputComponent";

export const ChatWrapper = ({ sessionId,initialMessages }: { initialMessages:Message[], sessionId: string }) => {
  const { messages, handleInputChange, handleSubmit, input,isLoading } = useChat({
    api: "/api/chat-stream",
    body: {
      sessionId: sessionId,
    },
    initialMessages:initialMessages
  });

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageComponent initialMessages={initialMessages} isLoading={isLoading} messages={messages} />
      </div>
      <div className="p-4">
        <InputComponent
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
