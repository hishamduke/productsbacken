import { Router } from "express";
import { productsRouter } from "./products/router.js";
import { authRouter } from "./auth/router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);

export const v1Router = router;
