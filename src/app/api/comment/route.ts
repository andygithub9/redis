import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { text, tags } = body;

    const commentId = nanoid();

    // usual version
    /* 
    const comment = {
      text,
      timestamp: new Date(),
      author: req.cookies.get("userId")?.value,
    };

    // Promise.all() 裡面的 Promise 會同時執行
    // await Promise.all()，等到裡面的 Promise.all() 都被 resolve 後才會接續執行下面的代碼
    await Promise.all([
      // add comment to list
      // list 是按插入順序排序的字符串列表
      redis.rpush("comments", commentId),

      // add tags to comment
      // set 是唯一字符串的無序集合，唯一集合就表示一個 set 裡面不能有重複的值
      redis.sadd(`tags:${commentId}`, tags),

      // retrieve and store comment details
      // hash 類似於 Python dictionaries 或是 JS 的 Object
      redis.hset(`comment_details:${commentId}`, comment),
    ]);
    */

    // redis json version
    const comment = {
      text,
      tags,
      timestamp: new Date(),
      author: req.cookies.get("userId")?.value,
    };

    // Promise.all() 裡面的 Promise 會同時執行
    // await Promise.all()，等到裡面的 Promise.all() 都被 resolve 後才會接續執行下面的代碼
    await Promise.all([
      redis.rpush("comments", commentId),
      // redis.json.set() 的第一個參數是 key ，
      // 第二個參數是這個 JSON 的 path ，'$' 代表的是 JSON 的根，
      // 如果這個 JSON 是 {"a":2} 然後你想要訪問這個 JSON 的 a 屬性，
      // 那 path 就會是 '$.a' ，
      // 第三個參數是傳給 key 為第一個參數的 JSON 的 path 的值
      redis.json.set(`comment:${commentId}`, "$", comment),
    ]);

    return new Response("OK");
  } catch (err) {
    console.log(err);
  }
};
