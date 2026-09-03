import { Router } from "express";
import { me } from "../Controllers/getMe.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", requireAuth, me);

export default router;