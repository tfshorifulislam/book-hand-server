import type { Request, Response } from "express";
import { getAllBookListings } from "../Services/books.service.js";

export const getBooksController = async (req: Request, res: Response) => {

    try {

        const page = Math.max(Number(req.query.page) || 1, 1);

        const limit = Math.min(
            Math.max(Number(req.query.limit) || 12, 1),
            20
        )

        const search =
            typeof req.query.search === "string"
                ? req.query.search.trim()
                : "";

console.log("SEARCH:", search);

        const result = await getAllBookListings(page, limit, search);

        res.status(200).json({
            success: true,
            message: 'Book listings fetched successfully',
            data: result.listings,
            pagination: result.pagination,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch book listings',
        });
    }

}