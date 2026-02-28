const express = require('express');
const router = express.Router();
const { updatePlan, createPlan,deletePlan,showPlan } = require('./superPlans.controllers');

router.post('/create', createPlan);
router.delete('/:id',deletePlan);
router.get('/show',showPlan)
router.patch('/update', updatePlan);

module.exports = router;
