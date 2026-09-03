import jwt, { type SignOptions } from "jsonwebtoken";

const accessSecret = process.env.AUTH_SECRET;
const refreshSecret = process.env.AUTH_REFRESH_SECRET;

const accessExpiresIn = process.env.AUTH_SECRET_EXPIRES_IN || "15m";

const refreshExpiresIn =process.env.AUTH_REFRESH_SECRET_EXPIRES_IN || "24h";

if (!accessSecret) {
    throw new Error("AUTH_SECRET is not configured");
}

if (!refreshSecret) {
    throw new Error("AUTH_REFRESH_SECRET is not configured");
}

export const generateAccessToken = (userId: string): string => {
    return jwt.sign(
        {
            userId,
        },
        accessSecret,
        {
            expiresIn: accessExpiresIn as SignOptions["expiresIn"],
        }
    );
};



export const generateRefreshToken = (userId: string): string => {
    return jwt.sign(
        {
            userId,
        },
        refreshSecret,
        {
            expiresIn: refreshExpiresIn as SignOptions["expiresIn"],
        }
    );
};



export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, accessSecret);
};



export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, refreshSecret);
};