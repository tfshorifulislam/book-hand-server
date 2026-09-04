import { Router } from "express";
import { login } from "../../Controllers/Authentication_Controllers/login.controller.js";

const router = Router();

router.post("/login", login);

export default router;