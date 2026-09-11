import type { NextFunction, Request, Response } from "express";


const verifyUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const secret = req.headers["x-internal-secret"];
    const userId = req.headers["x-user-id"];

    if (
        secret !== process.env.BACKEND_INTERNAL_SECRET ||
        !userId ||
        typeof userId !== "string"
    ) {
        res.status(401).json({
            message: "Unauthorized",
        });

        return;
    }

    req.user = {
        id: userId,
    };

    next();
};

export default verifyUser;