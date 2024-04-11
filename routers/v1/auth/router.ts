import { Router } from "express";
import { loginController, profile, signupController } from "./controller.js";
import { authMiddleWare } from "./middlewares.js";

const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", authMiddleWare, profile);

export const authRouter = router;
