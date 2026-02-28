const AuditLog = require('../modules/auditLogs/auditLogs.models');

/**
 * Persists a critical action to the Audit Log.
 * 
 * @param {string} userId - ID of the user performing the action
 * @param {string} action - Action type (e.g., 'TENANT_CREATED')
 * @param {string} resourceId - ID of the affected resource
 * @param {object} changes - Description of what changed
 * @param {string} [reason] - Reason for the action
 */
const logAuditAction = async (userId, action, resourceId, changes, reason = 'N/A') => {
  try {
    const log = new AuditLog({
      user: userId || 'System',
      action,
      resourceId,
      changes,
      reason
    });
    await log.save();
    console.log(`[AuditLog] ${action} recorded for ${resourceId}`);
  } catch (error) {
    console.error(`[AuditLog-Error] Failed to record log:`, error.message);
  }
};

module.exports = { logAuditAction };
