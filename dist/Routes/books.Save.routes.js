import { Router } from "express";
import { saveBookController } from "../Controllers/books.Save.controller.js";
import verifyUser from "../middleWare/verify.token.js";
const router = Router();
router.post("/books/:listingId/save", verifyUser, saveBookController);
export default router;
