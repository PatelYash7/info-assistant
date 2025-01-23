"use client";
import { cn } from "@/lib/utils";
import type { Message } from "ai";
import { Bot, MessageSquare, User } from "lucide-react";
import { useEffect, useRef } from "react";

interface MessageComponentProps {
  messages: Message[];
  initialMessages: Message[];
  isLoading: boolean;
  error:string;
}

export default function MessageComponent({
  messages,
  error,
  isLoading,
  initialMessages,
}: MessageComponentProps) {
  const messagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, initialMessages]);
  return (
    <div className="space-y-4">
      {initialMessages.length > 0 ? (
        initialMessages.map((message) => (
          <div
            key={message.id}
            className={cn(
              {
                "justify-end": message.role === "user",
              },
              "flex"
            )}
          >
            <div
              className={`max-w-md p-4 rounded-lg flex items-center gap-2 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {message.role === "user" ? (
                  <User className="size-6" />
                ) : (
                  <Bot className="size-8" />
                )}
              </p>
              <p>{message.content}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[500px]  flex justify-center items-center ">
          <div className="flex flex-col items-center">
            <MessageSquare className="size-14 text-blue-600" />
            <div className="text-3xl py-2">Welcome to the Chat !</div>
            <div className="text-lg">Ask question to your assistant</div>
          </div>
        </div>
      )}
        {
          error && <div>{error}</div>
        }
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            {
              "justify-end": message.role === "user",
            },
            "flex"
          )}
        >
          <div
            className={`max-w-md p-4 rounded-lg flex items-center gap-2 ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-100"
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {message.role === "user" ? (
                <User className="size-6" />
              ) : (
                <Bot className="size-8" />
              )}
            </p>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div>
          <div className="animate-pulse flex justify-start">
            <div className="max-w-md p-4 rounded-lg bg-gray-700 text-gray-100">
              <p className="text-sm font-semibold mb-1">
                <Bot className="size-8" />
              </p>

              
              <p>Loading...</p>
              <p>if it takes too long to respond then it might be due to token limit reached.</p>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesRef}></div>
    </div>
  );
}
