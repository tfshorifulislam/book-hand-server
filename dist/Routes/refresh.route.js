import { Router } from "express";
import { refresh } from "../Controllers/refresh.controller.js";
const router = Router();
router.post("/refresh", refresh);
export default router;
