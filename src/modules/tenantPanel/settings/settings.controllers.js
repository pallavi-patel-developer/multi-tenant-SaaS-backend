import TenantSettings from "./settings.models.js";

const updateGeneralSettings = async (req, res) => {
    try {
        const { businessName, businessEmail, supportPhone, gst, businessAddress } = req.body;
        const tenantId = req.user?.tenantId;

        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Tenant ID missing" });
        }

        // Check if email already exists for another tenant
        const emailExist = await TenantSettings.findOne({ 
            "generalSettings.businessEmail": businessEmail, 
            tenantId: { $ne: tenantId } 
        });
        if (emailExist) {
            return res.status(400).json({ success: false, message: "Email already exists for another business account" });
        }

        // Upsert general settings
        const settings = await TenantSettings.findOneAndUpdate(
            { tenantId },
            {
                $set: {
                    generalSettings: {
                        businessName,
                        businessEmail,
                        supportPhone,
                        gst,
                        businessAddress
                    }
                }
            },
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({ 
            success: true, 
            message: "General settings updated successfully", 
            data: settings.generalSettings 
        });
    } catch (error) {
        console.error("Error updating general settings:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

const updateLocalizationSettings = async (req, res) => {
    try {
        const { defaultCurrency, timezone, dateFormat } = req.body;
        const tenantId = req.user?.tenantId;

        if (!tenantId) {
            return res.status(401).json({ success: false, message: "Unauthorized: Tenant ID missing" });
        }

        // Upsert localization settings
        const settings = await TenantSettings.findOneAndUpdate(
            { tenantId },
            {
                $set: {
                    localization: {
                        defaultCurrency,
                        timezone,
                        dateFormat
                    }
                }
            },
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({ 
            success: true, 
            message: "Localization settings updated successfully", 
            data: settings.localization 
        });
    } catch (error) {
        console.error("Error updating localization settings:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

export { updateGeneralSettings, updateLocalizationSettings };