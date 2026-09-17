import { createClient } from "redis";
const redis = createClient({
    url: process.env.REDIS_URL,
});
redis.on("error", (error) => {
    console.error("Redis Error:", error);
});
export async function connectRedis() {
    await redis.connect();
    console.log("Redis connected successfully");
}
export default redis;
