import type {  Request, Response } from "express";
import { getUserBooksService } from "../Services/uses.Post.Service.js";


export const getUserBooks = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      50
    );

    const result = await getUserBooksService(
      userId,
      page,
      limit
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Get user books error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user's books",
    });
  }
};