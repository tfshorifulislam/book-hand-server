import { Router } from "express";
import { sellBook } from "../Controllers/Sell.Book.Controller.js";
import verifyToken from "../middleWare/verify.token.js";
const router = Router();
router.post("/sell-book", verifyToken, sellBook);
export default router;
