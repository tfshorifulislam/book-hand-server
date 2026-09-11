const verifyUser = (req, res, next) => {
    const secret = req.headers["x-internal-secret"];
    const userId = req.headers["x-user-id"];
    if (secret !== process.env.BACKEND_INTERNAL_SECRET ||
        !userId ||
        typeof userId !== "string") {
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
