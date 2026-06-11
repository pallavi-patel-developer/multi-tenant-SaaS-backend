import express from 'express';
import { getDashboard } from './dashboard.controllers.js';
import { tenantAuthMiddleware } from '../../../middlewares/auth.tenant.middleware.js';

const router = express.Router();

router.get('/', tenantAuthMiddleware, getDashboard);

export default router;
