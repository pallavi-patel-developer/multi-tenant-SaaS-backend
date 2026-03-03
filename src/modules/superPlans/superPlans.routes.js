import express from 'express';
const router = express.Router();
import { updatePlan, createPlan, deletePlan, showPlan } from './superPlans.controllers.js';

router.post('/create', createPlan);
router.delete('/:id', deletePlan);
router.get('/show', showPlan)
router.patch('/update', updatePlan);

export default router;
