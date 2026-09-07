import type { Request, Response } from "express";
import { getAllBookListings } from "../Services/books.service.js";

export const getBooks = async (req: Request, res: Response) => {

    try {
        const listings = await getAllBookListings();

        res.status(200).json({
            success: true,
            message: 'Book listings fetched successfully',
            data: listings,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to fetch book listings',
        });

    }

}