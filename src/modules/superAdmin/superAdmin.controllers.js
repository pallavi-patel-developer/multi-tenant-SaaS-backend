import jwt from 'jsonwebtoken';
import SuperAdmin from './superAdmin.models.js';
import superRoleSchema from '../superRole/superRole.models.js';
import SuperTenant from '../superTenant/superTenant.models.js';
import { Order } from '../tenantPanel/orders/orders.model.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First: Check SuperAdmin collection
    const admin = await SuperAdmin.findOne({ email });
    if (admin) {
      const ispassword = await admin.comparePassword(password);
      if (!ispassword) return res.status(401).json({ message: "Password is incorrect" });

      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.status(200).json({ message: "Login successfull", token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
    }

    // Second: Check SuperRole collection
    const role = await superRoleSchema.findOne({ roleEmail: email });
    if (role) {
      const ispassword = await role.comparePassword(password);
      if (!ispassword) return res.status(401).json({ message: "Password is incorrect" });

      const token = jwt.sign(
        { id: role._id, role: role.roleName, permissions: role.permissions },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.status(200).json({ message: "Login successfull", token, role: { id: role._id, name: role.roleName, email: role.roleEmail, permissions: role.permissions } });
    }

    // If neither matched
    return res.status(401).json({ message: "EMAIL NOT FOUND" });

  }
  catch (e) {
    res.status(500).json({ message: "Internal server error in LOGIN", error: e.message });
  }
}

const getDashboard = async (req, res) => {
  try {
    const totalTenants = await SuperTenant.countDocuments();
    const activeTenants = await SuperTenant.countDocuments({ tenantStatus: 'active' });
    const totalOrders = await Order.countDocuments();
    
    // Calculate Monthly Revenue roughly from orders
    const orders = await Order.find();
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    const data = [
      { name: 'Jan', revenue: totalRevenue * 0.1, tenants: totalTenants * 0.1 },
      { name: 'Feb', revenue: totalRevenue * 0.15, tenants: totalTenants * 0.15 },
      { name: 'Mar', revenue: totalRevenue * 0.2, tenants: totalTenants * 0.2 },
      { name: 'Apr', revenue: totalRevenue * 0.25, tenants: totalTenants * 0.25 },
      { name: 'May', revenue: totalRevenue * 0.3, tenants: totalTenants * 0.3 },
    ];

    if (totalRevenue === 0 && totalTenants === 0) {
      // Mock data if empty
      data[0] = { name: 'Jan', revenue: 4000, tenants: 240 };
      data[1] = { name: 'Feb', revenue: 3000, tenants: 139 };
      data[2] = { name: 'Mar', revenue: 2000, tenants: 980 };
      data[3] = { name: 'Apr', revenue: 2780, tenants: 390 };
      data[4] = { name: 'May', revenue: 1890, tenants: 480 };
    }

    const recentActivity = [
      { id: 1, tenant: "Acme Corp", action: "Upgraded Plan", time: "2 hours ago", status: "Completed" },
      { id: 2, tenant: "Globex Inc", action: "New Subscription", time: "4 hours ago", status: "Pending" },
    ];

    return res.status(200).json({
      success: true,
      data: {
        totalTenants,
        activeTenants,
        monthlyRevenue: `$${totalRevenue.toFixed(2)}`,
        totalOrders,
        activeSubscriptions: activeTenants, // rough estimate
        data,
        recentActivity
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export { login, getDashboard }