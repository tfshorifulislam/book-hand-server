import { Router } from "express";
import { resetPassword } from "../../Controllers/Authentication_Controllers/reset-password.controller.js";
const router = Router();
router.post("/reset-password", resetPassword);
export default router;
