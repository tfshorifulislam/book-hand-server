import { Router } from "express";
import { forgotPassword, } from "../Controllers/forgotPassword.controller.js";
const router = Router();
router.post("/forgot-password", forgotPassword);
export default router;
