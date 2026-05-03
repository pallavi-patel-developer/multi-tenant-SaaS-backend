import { Router } from 'express';
import { createSuperPayment, getSuperPayment } from './superPayments.controllers.js';
import { authorizePermission } from '../../middlewares/auth.permissions.middleware.js';

const router = Router();

router.post('/', authorizePermission('Payments', 'Configure'), createSuperPayment);
router.get('/', authorizePermission('Payments', 'View'), getSuperPayment);

export default router;