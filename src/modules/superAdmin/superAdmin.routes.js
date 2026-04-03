import express from "express";
import {login} from "./superAdmin.controllers.js";
import {authenticate,authorizeSuperAdmin} from "../../middlewares/auth.superAdmin.middleware.js";
const router = express.Router();

// ✅ PUBLIC route — koi middleware nahi (login ke liye token kahan se aayega?)
router.post("/login", login);

// ✅ PROTECTED routes — pehle token check, phir role check, tab controller
// router.get("/profile",   authenticate, authorizeSuperAdmin, login);
// router.get("/dashboard", authenticate, authorizeSuperAdmin, getDashboard);

export default router;
