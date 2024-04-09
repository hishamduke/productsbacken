import { Router } from "express";
import { productsRouter } from "./products/router.js";

const router = Router();
router.use("/products", productsRouter);

export const v1Router = router;
