import * as TenantAuthService from '../../services/tenantAuth.service.js';

export const login = async (req, res) => {
    const { tenantId, password } = req.body;
    try {
        const result = await TenantAuthService.loginTenant(tenantId, password);
        res.status(200).json({ message: "Login successful", result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
