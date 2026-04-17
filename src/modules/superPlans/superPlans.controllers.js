import SuperPlan from './superPlans.models.js';
import { logAuditAction } from '../../utils/logger.js';
export const createPlan = async (req, res) => {
  try {
    const { planName, planPrice, planCode, billingCycle, trialDays, status } = req.body;
    const plan = await SuperPlan.create({
      planName,
      planPrice,
      planCode,
      billingCycle,
      trialDays,
      status
    });
    await logAuditAction(req, 'PLAN_CREATED', req.params.id, `Plan created: ${plan.planName}`);
    res.status(201).json({ success: true, message: 'Plan created successfully', plan })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create plan', error: error.message })
  }
}

export const showPlan = async (req, res) => {
  try {
    const plan = await SuperPlan.find().lean().sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: 'Plan fetched successfully', plan })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch plan', error: error.message })
  }
}

export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await SuperPlan.findByIdAndDelete(id);
    await logAuditAction(req, 'PLAN_DELETED', req.params.id, `Plan deleted: ${plan.planName}`);
    res.status(200).json({ success: true, message: 'Plan Deleted Sucessfully' });
  } catch {
    res.status(500).json({ success: false, message: "Plan didnt delete" })
  }
}

export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await SuperPlan.findByIdAndUpdate(id, req.body, { new: true });
    await logAuditAction(req, 'PLAN_UPDATED', req.params.id, `Plan updated: ${plan.planName}`);
    res.status(200).json({ success: true, message: 'Plan Updated Sucessfully', plan });
  } catch (error) {
    res.status(500).json({ success: false, message: "Plan didnt update", error: error.message })
  }
}