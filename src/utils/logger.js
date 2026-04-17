import AuditLog from '../modules/auditLogs/auditLogs.models.js';

export const logAuditAction = async (req, actionTitle, resourceId, details) => {
  try {

    let user = req.user;

    if (!user && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET);

        if (decoded.role === 'superAdmin') {
          const SuperAdminModel = await import('../modules/superAdmin/superAdmin.models.js');
          user = await SuperAdminModel.default.findById(decoded.id).lean();
        } else {
          const SuperRoleModel = await import('../modules/superRole/superRole.models.js');
          user = await SuperRoleModel.default.findById(decoded.id).lean();
        }
      } catch (err) {
        console.log("Logger Token Parse Error ignored");
      }
    }

    const adminName = user?.name || user?.roleName || user?.email || user?.roleEmail || 'Unknown';

    const adminRole = req.user?.role || (req.user?.roleName ? 'Role: ' + req.user.roleName : 'Super Admin');
    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.connection?.remoteAddress || req.ip;
    await AuditLog.create({
      adminName,
      adminRole,
      ipAddress: ipAddress,
      resourceId: resourceId ? resourceId.toString() : 'N/A',
      action: actionTitle,
      changes: details
    })
  }
  catch (error) {
    console.error("Error logging audit action:", error);
  }
}
