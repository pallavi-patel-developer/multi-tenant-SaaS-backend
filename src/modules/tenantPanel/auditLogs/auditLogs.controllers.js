import { TenantAuditLog } from "./auditLogs.model.js";

export const getAuditLogs = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const logs = await TenantAuditLog.find({ tenantId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAuditLog = async (req, res) => {
  try {
    const { user, role, action, entity, entityId } = req.body;
    const { tenantId } = req.user;
    const newLog = await TenantAuditLog.create({ tenantId, user, role, action, entity, entityId });
    return res.status(201).json({ success: true, data: newLog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
