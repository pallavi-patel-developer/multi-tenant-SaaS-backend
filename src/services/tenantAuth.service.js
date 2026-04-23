import SuperTenant from '../superTenant/superTenant.models.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginTenant = async (email, password) => {
    const tenant = await SuperTenant.findOne({ 'owner.email': email });
    if (!tenant) throw new Error('Tenant not found');
    const isMatch = await bcrypt.compare(password, tenant.owner.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = jwt.sign(
        {
            tenantId: tenant.tenantId,
            email: tenant.owner.email,
            features: tenant.feature_flags,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token, tenant };
};

export { loginTenant };
