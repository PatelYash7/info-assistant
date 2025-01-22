import { cn } from "@/lib/utils";
import type { Message } from "ai";
import { Bot, User } from "lucide-react";

interface MessageComponentProps {
  messages: Message[];
}

export default function MessageComponent({ messages }: MessageComponentProps) {
  return (
    <div className="space-y-4">
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
    </div>
  );
}
