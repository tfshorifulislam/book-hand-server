import { Router } from "express";
import { userProfile } from "../Controllers/userId.Profile.Controller.js";

const router = Router();

router.get("/profile/:userId", userProfile );

export default router;