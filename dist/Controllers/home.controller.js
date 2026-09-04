export const getHome = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Book Hand server is running successfully.",
    });
};
