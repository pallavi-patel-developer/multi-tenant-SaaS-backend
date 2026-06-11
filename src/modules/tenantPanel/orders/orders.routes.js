import express from "express";
import { createOrder, getOrders, updateOrder, deleteOrder } from "./orders.controllers.js";
import { tenantAuthMiddleware } from "../../../middlewares/auth.tenant.middleware.js";

const router = express.Router();

router.post("/", tenantAuthMiddleware, createOrder);
router.get("/", tenantAuthMiddleware, getOrders);
router.put("/:id", tenantAuthMiddleware, updateOrder);
router.delete("/:id", tenantAuthMiddleware, deleteOrder);

export default router;
