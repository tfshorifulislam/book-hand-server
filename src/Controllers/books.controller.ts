import type { Request, Response } from "express";
import { getAllBooks } from "../Services/books.service.js";

export const getBooks = async (req: Request, res: Response) => {

    try {
        const books = await getAllBooks();

        res.status(200).json({
            success: true,
            message: 'Books fetched successfully',
            data: books,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            messasge: 'Failed to fetch books',
        });

    }

}