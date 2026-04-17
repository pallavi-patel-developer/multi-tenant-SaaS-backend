import { Router } from 'express';
import { createSuperPayment, getSuperPayment } from './superPayments.controllers.js';
import { authenticate, authorizeSuperAdmin } from '../../middlewares/auth.superAdmin.middleware.js';

const router = Router();

// Saare routes protected hain — req.user middleware se set hoga
router.use(authenticate);

router.post('/', createSuperPayment);
router.get('/', getSuperPayment);

export default router;