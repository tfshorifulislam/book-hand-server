import { Router } from "express";

import { getSavedBookController } from "../Controllers/save.Book.Get.Controller.js";
import verifyUser from "../middleWare/verify.token.js";

const router = Router();

router.get(
    "/books/:listingId/save",
    verifyUser,
    getSavedBookController
);

export default router;