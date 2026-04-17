import superRole from './superRole.models.js'
import { logAuditAction } from '../../utils/logger.js';

export const createRoles = async (req, res) => {
  try {
    const { roleName, roleEmail, rolePassword, description, permissions } = req.body;
    const role = await superRole.create({
      roleName,
      roleEmail,
      rolePassword,
      description,
      permissions
    });

    // *** FIRE AUDIT LOG ***
    await logAuditAction(req, 'ROLE_CREATED', role._id, `Created new role: ${roleName}`);

    return res.status(201).json({ success: true, message: "Role Created Sucessfulyy" });
  }
  catch (e) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const getAllRoles = async (req, res) => {
  try {
    const roles = await superRole.find().lean().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: roles });
  }
  catch (e) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const editRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleName, roleEmail, rolePassword, description, permissions } = req.body;

    // Hash password if updating
    let updateData = { roleName, roleEmail, description, permissions };
    if (rolePassword) {
      const bcrypt = await import('bcrypt');
      updateData.rolePassword = await bcrypt.default.hash(rolePassword, 10);
    }

    const role = await superRole.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
    await logAuditAction(req, 'ROLE_EDITED', req.params.id, `Role edited: ${role.roleName}`);
    return res.status(200).json({ success: true, data: role });
  }
  catch (e) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await superRole.findByIdAndDelete(id);
    await logAuditAction(req, 'ROLE_DELETED', req.params.id, `Role deleted: ${role.roleName}`);
    return res.status(200).json({ success: true, message: "Role Deleted Successfully" });
  }
  catch (e) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}