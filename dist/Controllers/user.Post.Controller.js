import { getUserBooksService } from "../Services/uses.Post.Service.js";
import redis from "../config/redis.js";
export const getUserBooks = async (req, res) => {
    try {
        const { userId } = req.params;
        if (typeof userId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
        const cacheKey = `profile:books:userId=${userId}:page=${page}:limit=${limit}`;
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            console.log("PROFILE BOOKS CACHE HIT:", cacheKey);
            return res.status(200).json({
                success: true,
                ...cachedData,
            });
        }
        console.log("PROFILE BOOKS CACHE MISS:", cacheKey);
        const result = await getUserBooksService(userId, page, limit);
        // Save to Redis for 5 minutes
        await redis.set(cacheKey, result, { ex: 300, });
        console.log("PROFILE BOOKS CACHE SAVED:", cacheKey);
        return res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        console.error("Get user books error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user's books",
        });
    }
};
