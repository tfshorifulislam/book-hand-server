import { Router } from "express";
import { sellBook } from "../Controllers/Sell.Book.Controller.js";

const router = Router();

router.get("/sell-book", sellBook );

export default router;