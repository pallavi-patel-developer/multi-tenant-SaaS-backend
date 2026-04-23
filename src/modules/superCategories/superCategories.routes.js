import express from 'express';
import { getAllCategories, saveCategory } from './superCategories.controllers';
import { authenticate, authorizeSuperAdmin } from '../../middlewares/auth.superAdmin.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorizeSuperAdmin, getAllCategories);
router.put('/:type', authenticate, authorizeSuperAdmin, saveCategory);

export default router;