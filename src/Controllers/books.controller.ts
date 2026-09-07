import type { Request, Response } from "express";
import { getAllBookListings } from "../Services/books.service.js";

export const getBooks = async (req: Request, res: Response) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const listings = await getAllBookListings(page, limit);

        res.status(200).json({
            success: true,
            message: 'Book listings fetched successfully',
            data: listings,
            pagination: {
                page,
                limit
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to fetch book listings',
        });
    }

}