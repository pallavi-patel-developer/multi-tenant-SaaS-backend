import express from "express";
import { createProduct, getProducts, deleteProduct } from "./products.controllers.js";
import { tenantAuthMiddleware } from "../../../middlewares/auth.tenant.middleware.js";

const router = express.Router();
router.post("/", tenantAuthMiddleware, createProduct);
router.get("/", tenantAuthMiddleware, getProducts);
router.delete("/:id", tenantAuthMiddleware, deleteProduct);

export default router;
