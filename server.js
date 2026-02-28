require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const port = process.env.PORT;
const connectDB = require('./src/config/db');
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const superTenantRoutes = require('./src/modules/superTenant/superTenant.routes');
const superPlansRoutes = require('./src/modules/superPlans/superPlans.routes');
const auditLogsRoutes = require('./src/modules/auditLogs/auditLogs.routes');


app.use('/api/v1/tenants', superTenantRoutes);
app.use('/api/v1/plans', superPlansRoutes);
app.use('/api/v1/audit-logs', auditLogsRoutes);

app.get('/', (req, res) => {
  res.send("Multi-Tenant SaaS API is running...");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});