import type { Request, Response } from "express";

import { getSavedBookService } from "../Services/save.Book.Get.Service.js";

export const getSavedBookController = async ( req: Request, res: Response) => {
    try {
        const { listingId } = req.params;
        const userId = req.headers["x-user-id"];

        if (!listingId || Array.isArray(listingId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid listing ID",
            });
        }

        // User is not logged in
        if (!userId || typeof userId !== "string") {
            return res.status(200).json({
                success: true,
                isSaved: false,
            });
        }

        const isSaved = await getSavedBookService(
            userId,
            listingId
        );

        return res.status(200).json({
            success: true,
            isSaved,
        });
    } catch (error) {
        console.error("Get saved book status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get saved book status",
        });
    }
};