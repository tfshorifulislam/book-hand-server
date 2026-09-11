import { Router } from "express";
import { getBooksController } from "../Controllers/books.controller.js";
const router = Router();
router.get('/books', getBooksController);
export default router;
