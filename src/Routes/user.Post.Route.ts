import { Router } from "express";
import { getUserBooks } from "../Controllers/user.Post.Controller.js";


const router = Router();

router.get("/:userId/books", getUserBooks);

export default router;