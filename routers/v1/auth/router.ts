import { Router } from "express";
import {
  authMiddleWare,
  loginController,
  profile,
  signupController,
} from "./controller.js";

const router = Router();
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", authMiddleWare, profile);

export const authRouter = router;
