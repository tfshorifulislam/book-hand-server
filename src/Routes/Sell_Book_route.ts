import { Router } from "express";
import { sellBook } from "../Controllers/Sell.Book.Controller.js";

const router = Router();

router.post("/sell-book",  sellBook);

export default router;