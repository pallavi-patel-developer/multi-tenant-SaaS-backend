import { createRoles, getAllRoles, editRole, deleteRole } from "./superRole.controllers.js";
import { Router } from "express";

const router = Router();

router.post('/',createRoles);
router.get('/',getAllRoles);
router.patch('/:id',editRole);
router.delete('/:id',deleteRole);

export default router;