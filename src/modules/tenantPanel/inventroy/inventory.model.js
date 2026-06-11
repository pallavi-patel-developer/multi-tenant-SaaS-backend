import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant", required: true },
    name: { type: String, required: true },
    sku: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    threshold: { type: Number, default: 10 },
    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },
  },
  { timestamps: true }
);

// Pre-save hook to update status based on stock and threshold
inventorySchema.pre("save", function (next) {
  if (this.stock === 0) {
    this.status = "Out of Stock";
  } else if (this.stock <= this.threshold) {
    this.status = "Low Stock";
  } else {
    this.status = "In Stock";
  }
  next();
});

export const Inventory = mongoose.model("Inventory", inventorySchema);
