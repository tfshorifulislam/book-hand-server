import type { Request, Response } from "express";
import { sellBookService } from "../Services/sell.book.service.js";

export const sellBook = async (req: Request, res: Response) => {
    try {
        const {
            title,
            author,
            category,
            language,
            description,
            coverImage,
            price,
            condition,
        } = req.body;

        const userId = req.user.id as string

        const result = await sellBookService({
            userId,
            title,
            author,
            category,
            language,
            description,
            coverImage,
            price,
            condition,
        });

        return res.status(201).json({
            message: "Book listed successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to sell book",
        });
    }
};