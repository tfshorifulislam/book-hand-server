import { Router } from "express";
import { getWishlistController } from "../Controllers/wishlist.Get.Post.Controller.js";
import verifyUser from "../middleWare/verify.token.js";
const router = Router();
router.get("/wishlist", verifyUser, getWishlistController);
export default router;
