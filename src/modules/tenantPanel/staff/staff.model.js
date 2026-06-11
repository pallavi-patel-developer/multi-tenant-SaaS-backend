import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["Owner", "Manager", "Staff"],
      default: "Staff",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const Staff = mongoose.model("Staff", staffSchema);
