import mongoose from "mongoose";
import validate from "validator";

const tenantSettingsSchema = new mongoose.Schema({
    tenantId: {
        type: String,
        required: true,
        unique: true,
        ref: "Tenant"
    },
    generalSettings: {
        businessName: {
            type: String,
            required: true
        },
        businessEmail: {
            type: String,
            required: true,
            validate: email => validate.isEmail(email),
            message: "Please enter a valid email"
        },
        supportPhone: {
            type: String,
            required: true,
            validate: phone => validate.isMobilePhone(phone),
            message: "Please enter a valid phone number"
        },
        gst: {
            type: String,
            required: true,
        },
        businessAddress: {
            type: String,
            required: true
        }
    },
    localization: {
        defaultCurrency: {
            type: String,
            enum: ["INR", "USD"],
            default: "INR"
        },
        timezone: {
            type: String,
            default: "UTC"
        },
        dateFormat: {
            type: String,
            enum: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"],
            default: "DD/MM/YYYY"
        }
    },
    security: {},
    notification: {},
    changePassword: {
        newPassword: {
            type: String
        }
    }

});

export default mongoose.model("tenantSettings", tenantSettingsSchema);

