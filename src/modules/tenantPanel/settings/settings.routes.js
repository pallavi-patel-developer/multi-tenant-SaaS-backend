import express from "express";
import { updateGeneralSettings, updateLocalizationSettings } from "./settings.controllers.js";
import { tenantAuthMiddleware } from "../../../middlewares/auth.tenant.middleware.js";

const router = express.Router();

router.post("/localization", tenantAuthMiddleware, updateLocalizationSettings);
router.post("/general", tenantAuthMiddleware, updateGeneralSettings);

export default router;