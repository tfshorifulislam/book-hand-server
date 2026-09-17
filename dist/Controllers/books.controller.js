import { getAllBookListings } from "../Services/books.service.js";
import redis from "../config/redis.js";
export const getBooksController = async (req, res) => {
    try {
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 20);
        const search = typeof req.query.search === "string"
            ? req.query.search.trim()
            : "";
        console.log("SEARCH:", search);
        // Create unique cache key
        const cacheKey = `books:page=${page}:limit=${limit}:search=${search}`;
        const redisStart = performance.now();
        // 1. Check Redis
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
        const result = await getAllBookListings(page, limit, search);
        await redis.set(cacheKey, JSON.stringify(result), {
            EX: 300
        });
        console.log("CACHE SAVED:", cacheKey);
        res.status(200).json({
            success: true,
            message: 'Book listings fetched successfully',
            data: result.listings,
            pagination: result.pagination,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch book listings',
        });
    }
};
