import { Router } from "express";
import {
  createProduct,
  deleteSingleProduct,
  getAll,
  getAllFeatured,
  getSingleProduct,
  updateSingleProduct,
} from "./controller.js";

const router = Router();

router.get("/", getAll);
router.get("/featured", getAllFeatured);

router.post("/", createProduct);

router.get("/:productId", getSingleProduct);
router.put("/:productId", updateSingleProduct);
router.delete("/:productId", deleteSingleProduct);

export const productsRouter = router;
