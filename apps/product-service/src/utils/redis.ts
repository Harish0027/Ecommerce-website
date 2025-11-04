import { createClient, RedisClientType } from "redis";

export const client: RedisClientType = createClient({
  url: process.env.REDIS_URL, // ✅ Use Upstash TCP URL
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

await client.connect();

export default client;
