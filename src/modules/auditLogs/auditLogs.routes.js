import express from 'express';
const router = express.Router();
import * as auditLogsControllers from './auditLogs.controllers.js';

router.get('/', auditLogsControllers.getAuditLogs);

export default router;
