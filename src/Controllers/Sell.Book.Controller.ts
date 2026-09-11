import type { Request, Response } from "express";
import { sellBookService } from "../Services/sell.book.service.js";

export const sellBook = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            title,
            author,
            category,
            language,
            description,
            coverImage,
            price,
            condition,
        } = req.body;

        if (!userId) {
            return res.status(401).json({
                message: "User ID is required",
            });
        }

        if (
            !title ||
            !author ||
            !category ||
            !language ||
            !description ||
            !coverImage ||
            price === undefined ||
            !condition
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const result = await sellBookService({
            userId,
            title,
            author,
            category,
            language,
            description,
            coverImage,
            price: Number(price),
            condition,
        });

        return res.status(201).json({
            message: "Book listed successfully",
            data: result,
        });
    } catch (error) {
        console.error("Sell book error:", error);

        return res.status(500).json({
            message: "Failed to sell book",
        });
    }
};