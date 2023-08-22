import { Redis } from "@upstash/redis";

// command 點擊 fromEnv 可以看到 fromEnv 方法的描述
// This tries to load UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from your environment using process.env.
export const redis = Redis.fromEnv()