import type { Request, Response } from "express";
import { deleteBookListingService } from "../Services/books.Delete.Service.js";

export const deleteBookListingController = async (
    req: Request,
    res: Response
) => {
    try {
        const { listingId } = req.params;
        const userId = req.user?.id;

        if (typeof listingId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid listing ID",
            });
        }

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const result = await deleteBookListingService(
            listingId,
            userId
        );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        console.error("Delete book listing error:", error);

        if (
            error instanceof Error &&
            error.message === "Book listing not found"
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (
            error instanceof Error &&
            error.message ===
                "You can only delete your own listing"
        ) {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to delete book listing",
        });
    }
};