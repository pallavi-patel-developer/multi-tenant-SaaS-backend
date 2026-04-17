import AuditLog from './auditLogs.models.js';

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().lean().sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
