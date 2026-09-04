import type { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken, } from "../utils/jwt.js";

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required",
            });
        }

        const decoded = verifyRefreshToken(refreshToken);

        if (
            typeof decoded !== "object" ||
            decoded === null ||
            !("userId" in decoded)
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        const userId = decoded.userId as string;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }

        // নতুন tokens
        const newAccessToken = generateAccessToken(user.id);
        const newRefreshToken = generateRefreshToken(user.id);

        // নতুন refresh token database-এ save
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: newRefreshToken,
            },
        });

        // নতুন access token cookie
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });

        // নতুন refresh token cookie
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};