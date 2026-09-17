import { Router } from "express";
import { getSavedBookController } from "../Controllers/save.Book.Get.Controller.js";


const router = Router();

router.get(
    "/books/:listingId/save",
    getSavedBookController
);

export default router;