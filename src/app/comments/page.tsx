import { redis } from "@/lib/redis";
import Link from "next/link";

const Page = async () => {
  // 從 comments array 取索引為 0~3 的資料出來
  const commentIds = await redis.lrange("comments", 0, 3);

  const comments = await Promise.all(
    commentIds.map(async (commentId) => {
      // hgetall() return 指定 key 下的所有 fields and values
      const details: any = await redis.hgetall(`comment_details:${commentId}`);
      // smembers() return 指定 set 下的所有 members
      const tags = await redis.smembers(`tags:${commentId}`);

      return {
        commentId,
        details,
        tags,
      };
    })
  );

  return (
    <div className="flex flex-col gap-8">
      <Link href="/">Homepage</Link>
      {comments.map((comment) => (
        <div className="flex flex-col gap-2" key={comment.commentId}>
          <div className="flex flex-col gap-2">
            <h1>user id: {comment.details.author}</h1>
            <p>{comment.details.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
