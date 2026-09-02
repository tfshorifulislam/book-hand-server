import type { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Book Hand server is running successfully.",
  });
};