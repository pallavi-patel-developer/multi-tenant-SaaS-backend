import SuperTenant from '../modules/superTenant/superTenant.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginTenant = async (tenantId, password) => {
    const tenant = await SuperTenant
        .findOne({ tenantId })
        .select('+owner.password');

    if (!tenant) throw new Error('Invalid Tenant ID or password');

    const isMatch = await bcrypt.compare(password, tenant.owner.password);
    if (!isMatch) throw new Error('Invalid Tenant ID or password');

    if (tenant.tenantStatus === 'suspended') {
        throw new Error('Your account has been suspended. Please contact support.');
    }

    const token = jwt.sign(
        {
            tenantId: tenant.tenantId,
            email: tenant.owner.email,
            businessName: tenant.business?.name,
            features: tenant.feature_flags,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token, tenant };
};

export { loginTenant };
