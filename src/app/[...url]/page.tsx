import { ChatWrapper } from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";

const reconstructUrl = ({ url }: { url: string[] }) => {
  const decodedUrls = url.map((url) => decodeURIComponent(url));
  return decodedUrls.join("/");
};

export default async function Page({
  params,
}: {
  params: {
    url: string | string[] | undefined;
  };
}) {
  const { url } = await params;
  const urls = reconstructUrl({ url: url as string[] });
  const isAlreadyIndexed = await redis.sismember("indexed-urls", urls);
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
  const sessionId = (await cookies()).get("sessionId")?.value;

  if (sessionId) {
    return (
      <div>
        <ChatWrapper sessionId={sessionId as string} />
      </div>
    );
  }
}
