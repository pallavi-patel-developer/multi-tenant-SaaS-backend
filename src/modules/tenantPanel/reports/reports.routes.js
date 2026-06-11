import express from "express";
import { getReports } from "./reports.controllers.js";
import { tenantAuthMiddleware } from "../../../middlewares/auth.tenant.middleware.js";

const router = express.Router();
router.get("/", tenantAuthMiddleware, getReports);

export default router;
