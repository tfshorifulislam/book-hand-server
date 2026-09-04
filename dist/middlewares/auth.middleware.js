import { verifyAccessToken } from "../utils/jwt.js";
export const requireAuth = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token is required",
            });
        }
        const decoded = verifyAccessToken(token);
        if (typeof decoded !== "object" ||
            decoded === null ||
            !("userId" in decoded)) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token",
            });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token",
        });
    }
};
