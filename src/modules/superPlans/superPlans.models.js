import mongoose from 'mongoose';

const SuperPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  planPrice: { type: Number, required: true },
  planCode: { type: String, required: true },
  features: [String],
  billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  trialDays: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('SuperPlan', SuperPlanSchema);