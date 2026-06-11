import express from "express";
import { createProduct, getInventory, updateProduct, deleteProduct } from "./inventory.controllers.js";
import { tenantAuthMiddleware } from "../../../middlewares/auth.tenant.middleware.js";

const router = express.Router();

router.post("/", tenantAuthMiddleware, createProduct);
router.get("/", tenantAuthMiddleware, getInventory);
router.put("/:id", tenantAuthMiddleware, updateProduct);
router.delete("/:id", tenantAuthMiddleware, deleteProduct);

export default router;
