import express from "express";
import { createStaff, getStaff, updateStaff, deleteStaff } from "./staff.controllers.js";
import { tenantAuthMiddleware } from "../../../middlewares/auth.tenant.middleware.js";

const router = express.Router();

router.post("/", tenantAuthMiddleware, createStaff);
router.get("/", tenantAuthMiddleware, getStaff);
router.put("/:id", tenantAuthMiddleware, updateStaff);
router.delete("/:id", tenantAuthMiddleware, deleteStaff);

export default router;
