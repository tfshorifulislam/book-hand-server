import type { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { prisma } from "../../lib/prisma.js";


export const googleCallback = async ( req: Request, res: Response ) => {
    try {
        const user = req.user as {
            id: string;
            name: string;
            email: string;
            image: string | null;
        };

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken,
            },
        });

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.redirect(
            process.env.NEXT_PUBLIC_FRONTEND_URL!
        );
    } catch (error) {
        console.error("Google login error:", error);

        return res.redirect(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`
        );
    }
};