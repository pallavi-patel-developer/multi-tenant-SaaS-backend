import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// ─── Valid Feature Flag IDs ──────────────────────────────────────────────────
const ALL_FEATURES = [
    'f_business_name',
    'f_user_management',
    'f_product_management',
    'f_billing_management',
    'f_reports_analytics',
    'f_stock_quantity',
    'f_room_management',
    'f_manufacturing_dispatch',
    'f_drug_licensing',
];

const SuperCategorySchema = new Schema(
    {
        type: {
            type: String,
            required: [true, 'Business type is required'],
            unique: true,
            trim: true,
            lowercase: true,
            enum: {
                values: ['restaurant', 'hotel', 'retail', 'manufacturing', 'pharmacy', 'business'],
                message: '{VALUE} is not a valid business type',
            },
        },
        label: {
            type: String,
            required: [true, 'Label is required'],
            trim: true,
            maxLength: 50,
        },
        features: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => arr.every((f) => ALL_FEATURES.includes(f)),
                message: 'One or more feature IDs are invalid',
            },
        },
    },
    { timestamps: true }
);

export { ALL_FEATURES };
export default mongoose.model('SuperCategory', SuperCategorySchema);