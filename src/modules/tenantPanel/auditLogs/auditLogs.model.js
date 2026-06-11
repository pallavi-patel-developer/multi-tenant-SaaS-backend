import mongoose from "mongoose";

const tenantAuditLogSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true },
    user: { type: String, required: true },
    role: { type: String, required: true },
    action: { type: String, required: true },
    entity: { type: String },
    entityId: { type: String },
  },
  { timestamps: true }
);

export const TenantAuditLog = mongoose.model("TenantAuditLog", tenantAuditLogSchema);
