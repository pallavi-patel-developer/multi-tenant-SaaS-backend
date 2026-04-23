import mongoose from 'mongoose';
import validate from 'validator';
import { Schema } from 'mongoose';
const SuperTenantSchema = new Schema({
  tenantId:
  {
    type: String,
    required: true,
    unique: true,
    immutable: true,
    trim: true,
    index: true
  },

  business:
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 30
    },
    type:
    {
      type: String,
      required: true,
      trim: true
    },
    gstNumber: {
      type: String,
      required: true,
      trim: true
    }
  },
  pan: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate: email => validate.isEmail(email)
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: v => validate.isMobilePhone(v, "en-IN")
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30
    },
    state: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30
    },
    pinCode: {
      type: String,
      required: true,
      trim: true,
      maxLength: 6
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 30
    }
  },
  currency: { type: String, required: true, enum: ['USD', 'INR'] },
  mongoUri: { type: String, default: null }, // Optional custom DB URI
  subdomain: { type: String, required: true, unique: true, trim: true },
  // Feature flags are automatically copied from SuperCategory when tenant is created
  // e.g. if business.type = 'hotel' → feature_flags gets hotel's features from DB
  feature_flags: {
    type: [String],
    default: [],
  },
  subscription: {
    billingCycle: {
      type: String, enum: ['monthly', 'yearly'], default: 'monthly'
    },
    paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
    expiryDate: { type: Date, required: true },

    trialEndDate: { type: Date, default: null },
    plan: { type: String, required: true, default: 'Basic' },
  },
  tenantStatus: { type: String, enum: ['active', 'suspended'], default: 'active' },
}, { timestamps: true });

SuperTenantSchema.index({ "owner.email": 1 })
SuperTenantSchema.index({ subdomain: 1, tenantStatus: 1 })

// Mongoose Middlewares
SuperTenantSchema.pre("save", function () {
  this.subdomain = this.subdomain.toLowerCase();
});

SuperTenantSchema.pre("save", function () {
  if (this.subscription?.expiryDate && this.subscription.expiryDate < new Date()) {
    this.tenantStatus = "suspended";
  }
});
export default mongoose.model('SuperTenant', SuperTenantSchema);
