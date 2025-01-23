"use client";

import { Message, useChat } from "ai/react";
import MessageComponent from "./MessageComponent";
import InputComponent from "./InputComponent";
import { error } from "console";
import { useState } from "react";

export const ChatWrapper = ({
  sessionId,
  initialMessages,
}: {
  initialMessages: Message[];
  sessionId: string;
}) => {
  const [error, setError] = useState("");
  const { messages, handleInputChange, handleSubmit, input, isLoading } =
    useChat({
      api: "/api/chat-stream",
      body: {
        sessionId: sessionId,
      },
      onError: (err) => {
        console.error("Chat error:", err);
        setError("An error occurred. Please try again later.");
      },
      onResponse: (response) => {
        if (!response.ok) {
          setError(
            "We are sorry, but we are unable to process your request at this time."
          );
        }
      },
      initialMessages: initialMessages,
    });
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageComponent
          error={error}
          initialMessages={initialMessages}
          isLoading={isLoading}
          messages={messages}
        />
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
