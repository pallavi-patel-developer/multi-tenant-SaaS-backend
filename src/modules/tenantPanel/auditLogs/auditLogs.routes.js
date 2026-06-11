import express from "express";
import { getAuditLogs, createAuditLog } from "./auditLogs.controllers.js";
import { tenantAuthMiddleware } from "../../../middlewares/auth.tenant.middleware.js";

const router = express.Router();
router.get("/", tenantAuthMiddleware, getAuditLogs);
router.post("/", tenantAuthMiddleware, createAuditLog);

export default router;
