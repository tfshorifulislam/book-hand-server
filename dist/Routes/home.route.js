import { Router } from "express";
import { getHome } from "../Controllers/home.controller.js";
const router = Router();
router.get("/", getHome);
export default router;
