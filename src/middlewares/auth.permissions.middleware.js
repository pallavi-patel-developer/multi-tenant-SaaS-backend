import jwt from 'jsonwebtoken';
import SuperAdmin from '../modules/superAdmin/superAdmin.models.js';
import superRoleSchema from '../modules/superRole/superRole.models.js';

export const authorizePermission = (category, action) => {
  return async (req, res, next) => {
    try {
      // Assuming 'authenticate' middleware runs before this and sets req.user (which holds id and role metadata)
      // If req.user is missing but token is present, we need to decode it here gracefully.
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // SuperAdmin entirely bypasses permission checking
      if (decoded.role === 'superAdmin') {
        const adminUser = await SuperAdmin.findById(decoded.id).lean();
        if (!adminUser) return res.status(401).json({ message: "Invalid token. User not found" });
        req.user = adminUser; // pass forward
        return next();
      }

      // Check for SuperRole
      const roleUser = await superRoleSchema.findById(decoded.id).lean();
      if (!roleUser) return res.status(401).json({ message: "Invalid role payload" });
      
      // Perform RBAC evaluation
      let userPermissions = roleUser.permissions || {};
      if (Array.isArray(userPermissions) && userPermissions.length > 0 && typeof userPermissions[0] === 'object') {
        userPermissions = userPermissions[0];
      } else if (Array.isArray(userPermissions)) {
        userPermissions = {};
      }
      
      if (!userPermissions[category] || !Array.isArray(userPermissions[category])) {
        return res.status(403).json({ message: `Forbidden: Missing baseline permission for category '${category}'` });
      }

      if (!userPermissions[category].includes(action)) {
        return res.status(403).json({ message: `Forbidden: You do not have '${action}' rights for '${category}'` });
      }

      // Success
      req.user = roleUser;
      next();

    } catch (e) {
      return res.status(500).json({ message: "Server error checking permissions", error: e.message });
    }
  };
};
