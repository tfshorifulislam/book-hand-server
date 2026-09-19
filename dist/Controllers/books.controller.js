import { getAllBookListings } from "../Services/books.service.js";
import redis from "../config/redis.js";
export const getBooksController = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 20);
        const userId = req.headers["x-user-id"];
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : "";
        console.log("SEARCH:", search);
        /*
         * IMPORTANT:
         * isSaved user-specific.
         *
         * তাই logged-in user হলে userId cache key-তে রাখতে হবে।
         * Guest-এর জন্য "guest".
         */
        const cacheUser = typeof userId === "string"
            ? userId
            : "guest";
        const cacheKey = `books:user=${cacheUser}:page=${page}:limit=${limit}:search=${search}`;
        // Check Redis
        const redisStart = performance.now();
        const cachedData = await redis.get(cacheKey);
        console.log("REDIS GET TIME:", (performance.now() - redisStart).toFixed(2), "ms");
        console.log("REDIS RESULT:", cachedData ? "FOUND" : "NOT FOUND");
        if (cachedData) {
            console.log("CACHE HIT:", cacheKey);
            const result = JSON.parse(cachedData);
            return res.status(200).json({
                success: true,
                message: "Book listings fetched successfully",
                data: result.listings,
                pagination: result.pagination,
            });
        }
        console.log("CACHE MISS:", cacheKey);
        const result = await getAllBookListings(page, limit, search, typeof userId === "string"
            ? userId
            : undefined);
        await redis.set(cacheKey, JSON.stringify(result), {
            EX: 300,
        });
        console.log("CACHE SAVED:", cacheKey);
        return res.status(200).json({
            success: true,
            message: "Book listings fetched successfully",
            data: result.listings,
            pagination: result.pagination,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch book listings",
        });
    }
};
