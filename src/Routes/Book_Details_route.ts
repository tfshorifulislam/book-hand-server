import { Router } from "express";
import verifyToken from "../middleWare/verify.token.js";
import { bookDetsilsController } from "../Controllers/book.Details.Controller.js";

const router = Router();

router.post("/book-details/:id", verifyToken, bookDetsilsController);

export default router;