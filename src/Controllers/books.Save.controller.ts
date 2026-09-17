import type { Request, Response } from "express";
import { saveBookService } from "../Services/books.Save.Service.js";

export const saveBookController = async (
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

    const savedBook = await saveBookService(
      userId,
      listingId
    );

    return res.status(201).json({
      success: true,
      message: "Book saved successfully",
      data: savedBook,
    });
  } catch (error) {
    console.error("Save book error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save book",
    });
  }
};