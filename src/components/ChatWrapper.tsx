"use client";

import { useChat } from "ai/react";
import MessageComponent from "./MessageComponent";
import InputComponent from "./InputComponent";

export const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
  const { messages, handleInputChange, handleSubmit, input } = useChat({
    api: "/api/chat-stream",
    body: {
      sessionId: sessionId,
    },
  });

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageComponent messages={messages} />
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
