import { Router } from "express";
import { deleteSavedBookController } from "../Controllers/delete.Save.controller.js";
import verifyUser from "../middleWare/verify.token.js";
const router = Router();
router.delete("/books/:listingId/save", verifyUser, deleteSavedBookController);
export default router;
