const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    default: 'System' // Who performed the action (e.g., Admin ID or 'System')
  },
  action: {
    type: String,
    required: true,
    enum: ['TENANT_CREATED', 'PLAN_UPDATED', 'PAYMENT_RECEIVED', 'TENANT_SUSPENDED', 'TENANT_ACTIVATED']
  },
  resourceId: {
    type: String,
    required: true // e.g., Tenant ID or Order ID
  },
  changes: {
    type: mongoose.Schema.Types.Mixed, // What changed (before/after snippet or full object)
    required: true
  },
  reason: {
    type: String,
    default: 'N/A' // Why? (Optional)
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed // Optional extra info (IP, Browser, etc.)
  }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
