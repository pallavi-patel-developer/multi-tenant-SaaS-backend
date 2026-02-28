const express = require('express');
const router = express.Router();
const auditLogsControllers = require('./auditLogs.controllers');

router.get('/', auditLogsControllers.getAuditLogs);

module.exports = router;
