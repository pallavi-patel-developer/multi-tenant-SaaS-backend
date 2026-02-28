const mongoose = require('mongoose');

const SuperPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  planPrice: { type: Number, required: true },
  planCode: { type: String, required: true },
  features: [String],
  billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  trialDays: { type:Number ,default:0},
  status: {type: String, enum :['active', 'inactive'],default:'active'}
}, { timestamps: true });

module.exports = mongoose.model('SuperPlan', SuperPlanSchema);