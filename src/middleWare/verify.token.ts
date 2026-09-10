import type { NextFunction, Request, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose-cjs";

const JWKS = createRemoteJWKSet(
    new URL(`${process.env.BETTER_AUTH_URL}/api/auth/jwks`)
);

const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    console.log("token with headers:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    try {
        const { payload } = await jwtVerify(token, JWKS);

        res.locals.user = payload;

        console.log("payload:", payload);

        next();
    } catch (error) {
        console.log("Token is not verified:", error);

        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};

export default verifyToken;