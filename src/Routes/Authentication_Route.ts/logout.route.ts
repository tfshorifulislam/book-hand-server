import { Router } from "express";
import { logout } from "../../Controllers/Authentication_Controllers/logout.controller.js";

const router = Router();

router.post("/logout", logout);

export default router;