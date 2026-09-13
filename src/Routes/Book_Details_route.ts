import { Router } from "express";
import verifyToken from "../middleWare/verify.token.js";
import { bookDetailsController } from "../Controllers/book.Details.Controller.js";

const router = Router();

router.get("/book-details/:id", verifyToken, bookDetailsController);

export default router;