import type { Request, Response } from "express";
import { bookDetsilsService } from "../Services/books.Details.Service.js";

export const bookDetailsController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid book ID",
            });
        }

        const book = await bookDetsilsService(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book details fetched successfully",
            data: book,
        });
    } catch (error) {
        console.error("Book details error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch book details",
        });
    }
};