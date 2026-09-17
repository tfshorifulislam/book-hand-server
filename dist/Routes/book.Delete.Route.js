import { Router } from "express";
import { deleteBookListingController } from "../Controllers/book.Delete.Controller.js";
import verifyUser from "../middleWare/verify.token.js";
const router = Router();
router.delete("/books/:listingId", verifyUser, deleteBookListingController);
export default router;
