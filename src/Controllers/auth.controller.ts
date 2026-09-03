import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

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

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};