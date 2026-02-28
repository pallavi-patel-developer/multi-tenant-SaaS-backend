const mongoose = require('mongoose');
const validate = require('validator');

const SuperTenantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  ownerName : { type: String, required: true },
  ownerEmail : { type: String, required: true,
    validate : email => validate.isEmail(email) },
  ownerPhone : { type: Number, required: true,validate : phone=> validate.isMobilePhone(phone.toString()) },
  gstNumber : { type: String, required: true,validate : gst => validate.isGSTIN(gst) },
  pan : { type: String, required: true,validate : pan => validate.isTaxID(pan,'IN') },
  address : { type: String, required: true },
  country : { type: String, required: true },
  state : { type: String, required: true },
  city : { type: String, required: true },
  pinCode : { type: String, required: true },
  currency : { type: String, required: true,enum: ['USD', 'INR'] },
  mongoUri: { type: String, default: null }, // Optional custom DB URI
  ownerEmail: { type: String, required: true },

    subdomain: { type: String, required: true, unique: true },
    customMongoDB: { type: String, default: null },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    trialEndDate: { type: Date, default: null },
  plan: { type: String, required: true, default: 'Basic' },
  tenantStatus: { type: String, enum: ['active', 'suspended'], default: 'active' },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  expiryDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('SuperTenant', SuperTenantSchema);
