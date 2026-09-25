import { Router } from "express";
import verifyUser from "../middleWare/verify.token.js";
import { updateProfile } from "../Controllers/profile.update.controller.js";


const router = Router();

router.patch(
    "/profile",
    verifyUser,
    updateProfile
);

export default router;