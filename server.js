import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
import connectDB from './src/config/db.js';
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import superTenantRoutes from './src/modules/superTenant/superTenant.routes.js';
import superPlansRoutes from './src/modules/superPlans/superPlans.routes.js';
import auditLogsRoutes from './src/modules/auditLogs/auditLogs.routes.js';


app.use('/api/v1/tenants', superTenantRoutes);
app.use('/api/v1/plans', superPlansRoutes);
app.use('/api/v1/audit-logs', auditLogsRoutes);

import errorHandler from './src/middlewares/error.middleware.js';
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send("Multi-Tenant SaaS API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});