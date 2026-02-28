const express = require('express');
const router = express.Router();
const superTenantControllers = require('./superTenant.controllers');

router.get('/', superTenantControllers.getTenants);
router.post('/', superTenantControllers.createTenant);
router.patch('/:id/status', superTenantControllers.updateTenantStatus);

module.exports = router;
