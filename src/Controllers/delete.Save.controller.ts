import type { Request, Response } from "express";


export const deleteSavedBookController = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.user?.id;
        const { listingId } = req.params;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        if (!listingId || Array.isArray(listingId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid listing ID",
            });
        }

        await deleteSavedBookService(
            userId,
            listingId
        );

        return res.status(200).json({
            success: true,
            message: "Book removed from saved books",
        });
    } catch (error) {
        console.error("Delete saved book error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to remove saved book",
        });
    }
};