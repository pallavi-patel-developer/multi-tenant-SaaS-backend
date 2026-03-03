import express from 'express';
import * as superTenantControllers from './superTenant.controllers.js';

const router = express.Router();

router.get('/', superTenantControllers.getTenants);
router.get('/:id', superTenantControllers.getTenantById);
router.post('/', superTenantControllers.createTenant);
router.patch('/:id', superTenantControllers.updateTenant);
router.delete('/:id', superTenantControllers.deleteTenant);

export default router;
