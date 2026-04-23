import express from 'express';
import { getCategories, saveCategory } from './superCategories.controllers.js';
import { authenticate, authorizeSuperAdmin } from '../../middlewares/auth.superAdmin.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorizeSuperAdmin, getCategories);
router.put('/:type', authenticate, authorizeSuperAdmin, saveCategory);

export default router;