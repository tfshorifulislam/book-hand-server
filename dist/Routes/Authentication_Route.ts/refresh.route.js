import { Router } from "express";
import { refresh } from "../../Controllers/Authentication_Controllers/refresh.controller.js";
const router = Router();
router.post("/refresh", refresh);
export default router;
