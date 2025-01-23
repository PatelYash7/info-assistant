import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

const reconstructUrl = ({ url }: { url: string[] }) => {
  const decodedUrls = url.map((url) => decodeURIComponent(url));
  return decodedUrls.join("/");
};
type tParams = Promise<{ url: string[]}>;
export default async function Page({params}:{params:tParams}) {
  const { url } = await params;
  if (url?.length > 0) {
    const sessionCookie = (await cookies()).get("sessionId")?.value;

    const urls = reconstructUrl({ url: url });
    const sessionId = (urls + "--" + sessionCookie).replace(/\//g, "");
    const isAlreadyIndexed = await redis.sismember("indexed-urls", urls);
    const intialMessages = await ragChat.history.getMessages({
      amount: 10,
      sessionId: sessionId,
    });
    if (!isAlreadyIndexed) {
      await ragChat.context.add({
        type: "html",
        source: urls,
        config: {
          chunkOverlap: 50,
          chunkSize: 200,
        },
      });
      await redis.sadd("indexed-urls", urls);
    }

    if (sessionId) {
      return (
        <div>
          <ChatWrapper initialMessages={intialMessages} sessionId={sessionId} />
        </div>
      );
    }
  }
}
