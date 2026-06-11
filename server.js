import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import statusMonitor from 'express-status-monitor';

const app = express();
const port = process.env.PORT;
import connectDB from './src/config/db.js';
connectDB();

app.use(statusMonitor({
  title: "Multi-Tenant SaaS Dashboard",
  theme: "default.css",
  port: process.env.STATUS_MONITOR_PORT || 5001
}));

app.use(helmet());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://multi-tenant-panel-saas.vercel.app',
  'https://super-saas.duckdns.org',
];

const vercelPreviewRegex = /^https:\/\/.*\.vercel\.app$/;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import superTenantRoutes from './src/modules/superTenant/superTenant.routes.js';
import superPlansRoutes from './src/modules/superPlans/superPlans.routes.js';
import auditLogsRoutes from './src/modules/auditLogs/auditLogs.routes.js';
import superAdminRoutes from './src/modules/superAdmin/superAdmin.routes.js';
import superPaymentsRoutes from './src/modules/superPayments/superPayments.routes.js';
import superRoleRoutes from './src/modules/superRole/superRole.routes.js';
import superCategoriesRoutes from './src/modules/superCategories/superCategories.routes.js';
import tenantAuthRoutes from './src/modules/tenantAuth/tenantAuth.routes.js';
import tenantSettingsRoutes from './src/modules/tenantPanel/settings/settings.routes.js';
import tenantOrdersRoutes from './src/modules/tenantPanel/orders/orders.routes.js';
import tenantInventoryRoutes from './src/modules/tenantPanel/inventroy/inventory.routes.js';
import tenantStaffRoutes from './src/modules/tenantPanel/staff/staff.routes.js';
import tenantProductsRoutes from './src/modules/tenantPanel/products/products.routes.js';
import tenantReportsRoutes from './src/modules/tenantPanel/reports/reports.routes.js';
import tenantAuditLogsRoutes from './src/modules/tenantPanel/auditLogs/auditLogs.routes.js';

app.use('/api/v1/tenants', superTenantRoutes);
app.use('/api/v1/plans', superPlansRoutes);
app.use('/api/v1/audit-logs', auditLogsRoutes);
app.use('/api/v1/admin', superAdminRoutes);
app.use('/api/v1/payments', superPaymentsRoutes);
app.use('/api/v1/roles', superRoleRoutes);
app.use('/api/v1/categories', superCategoriesRoutes);
app.use('/api/v1/tenant/auth', tenantAuthRoutes);
app.use('/api/v1/tenant/settings', tenantSettingsRoutes);
app.use('/api/v1/tenant/orders', tenantOrdersRoutes);
app.use('/api/v1/tenant/inventory', tenantInventoryRoutes);
app.use('/api/v1/tenant/staff', tenantStaffRoutes);
app.use('/api/v1/tenant/products', tenantProductsRoutes);
app.use('/api/v1/tenant/reports', tenantReportsRoutes);
app.use('/api/v1/tenant/audit-logs', tenantAuditLogsRoutes);

import errorHandler from './src/middlewares/error.middleware.js';
app.use(errorHandler);

// Health check — used by Docker & Nginx
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'multi-tenant-saas-backend'
  });
});

app.get('/', (req, res) => {
  res.send("Multi-Tenant SaaS API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});