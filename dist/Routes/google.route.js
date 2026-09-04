import { Router } from "express";
import passport from "../Config/passport.js";
import { googleCallback } from "../Controllers/google.controller.js";
const router = Router();
// Start Google login
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}));
// Google callback
router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`,
}), googleCallback);
export default router;
