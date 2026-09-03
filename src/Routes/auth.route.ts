import { Router } from "express";
import { signup, login } from "../Controllers/auth.controller.js";

const router = Router();

//signup route
router.post("/signup", signup);

//login route
router.post("/login", login);

export default router;