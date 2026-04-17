import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  adminName: { type: String, default: 'Unknown' },
  adminRole: { type: String, default: 'Super Admin' },
  action: { type: String, required: true },
  resourceId: { type: String, required: true },
  ipAddress: { type: String },
  changes: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

export default mongoose.model('AuditLog', AuditLogSchema);
