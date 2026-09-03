import { Router } from "express";

const router = Router();

router.post("/signup", async (req, res) => {
  res.json({
    message: "Signup route working",
  });
});

export default router;