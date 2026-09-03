import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
    userId?: string;
}

export const requireAuth = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token is required",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyAccessToken(token);

        if (
            typeof decoded !== "object" ||
            decoded === null ||
            !("userId" in decoded)
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token",
            });
        }

        req.userId = decoded.userId as string;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
};