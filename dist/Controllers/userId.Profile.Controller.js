import { userProfileService } from "../Services/userId.Profile.Service.js";
export const userProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userProfileService(userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found",
            });
        }
        ;
        return res.status(200).json({
            user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to get user profile",
        });
    }
};
