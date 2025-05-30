import express from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  reorderProducts,
} from "../controllers/product-controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", upload.single("image"), createProduct);

router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
router.put("/reorder", reorderProducts);

export default router;
