import jwt, { type SignOptions } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

if (!accessSecret || !refreshSecret) {
    throw new Error("JWT secrets are not configured");
}

export const generateAccessToken = (userId: string, sessionId: string,) => {

    const options: SignOptions = {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign(
        {
            userId,
            sessionId,
        },
        accessSecret,
        options,
    );
};

export const generateRefreshToken = (userId: string, sessionId: string,) => {
    const options: SignOptions = {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign({ userId, sessionId, }, refreshSecret, options,);
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessSecret) as {
        userId: string;
        sessionId: string;
    };
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, refreshSecret) as {
        userId: string;
        sessionId: string;
    };
};