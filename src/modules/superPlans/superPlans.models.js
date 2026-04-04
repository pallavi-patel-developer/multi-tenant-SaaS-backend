import mongoose from 'mongoose';

const SuperPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  planPrice: { type: Number, required: true },
  planCode: { type: String, required: true },
  billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  trialDays: { type: Number, default: 14 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('SuperPlan', SuperPlanSchema);