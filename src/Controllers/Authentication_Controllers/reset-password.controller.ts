import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../../lib/prisma.js";



export const resetPassword = async (
    req: Request,
    res: Response
) => {
    try {
        const { token, newPassword } = req.body;

        // Validate input
        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Token and new password are required",
            });
        }

        // Validate password
        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
            });
        }

        // Hash token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with valid token
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            12
        );

        // Update password and invalidate reset token/session
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,

                resetPasswordToken: null,
                resetPasswordExpires: null,

                // Invalidate existing refresh session
                refreshToken: null,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};