import type { Request, Response } from "express";
import { updateProfileService } from "../Services/Profile.Update.Service.js";

export const updateProfile = async (req: Request, res: Response) => {
    try {

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const { name, email, image } = req.body;
        
        const user = await updateProfileService({ userId, name, email, image, });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};