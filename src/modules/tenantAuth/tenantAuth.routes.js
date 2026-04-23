import express from 'express';
import * as TenantAuthControllers from './tenantAuth.controllers.js';

const router = express.Router();

router.post('/login', TenantAuthControllers.login);

export default router;