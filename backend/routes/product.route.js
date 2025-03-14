

import express from "express";
import { createProduct, getProduct, updateProduct, deleteProduct, getProducts, deleteProducts } from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.delete("/", deleteProducts);
router.get("/", getProducts);

export default router;