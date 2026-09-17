import { getWishlistService } from "../Services/wishlist.Get.Post.Service.js";
export const getWishlistController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const wishlist = await getWishlistService(userId);
        return res.status(200).json({
            success: true,
            message: "Wishlist fetched successfully",
            data: wishlist,
        });
    }
    catch (error) {
        console.error("Get wishlist error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch wishlist",
        });
    }
};
