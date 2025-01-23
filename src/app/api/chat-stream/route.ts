import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const response = await ragChat.chat(lastMessage, {
      sessionId,
      streaming: true,
    });
    return aiUseChatAdapter(response);
  } catch (e) {
    console.log(e)
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue("An error occurred due to limited tokens. Please try again later.");
        controller.close();
      },
    });

    return aiUseChatAdapter({
      output: errorStream,
      isStream: true,
    });
  }
};
