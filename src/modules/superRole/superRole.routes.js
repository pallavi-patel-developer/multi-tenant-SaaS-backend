import { createRoles, getAllRoles, editRole, deleteRole } from "./superRole.controllers.js";
import { Router } from "express";

import { authorizePermission } from "../../middlewares/auth.permissions.middleware.js";

const router = Router();

router.post('/', authorizePermission('Roles', 'Create'), createRoles);
router.get('/', authorizePermission('Roles', 'View'), getAllRoles);
router.patch('/:id', authorizePermission('Roles', 'Edit'), editRole);
router.delete('/:id', authorizePermission('Roles', 'Delete'), deleteRole);

export default router;