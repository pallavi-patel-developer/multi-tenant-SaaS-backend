// Service ka kaam:

// validation logic

// duplicate checks

// subdomain generation

// tenantId generation

// expiry calculation

// billing logic attach karna

// DB create karna (multi-tenant case me)

// 🚨 Rule: Service Layer me kya nahi hoga?

// ❌ Direct res.json()
// ❌ Express logic
// ❌ HTTP status codes

// Wo controller ka kaam hai.

// services/superTenant.service.js

import SuperTenant from '../modules/superTenant/superTenant.models.js';
import { nanoid } from "nanoid";

const createTenant = async (payload) => {
  const { subdomain, subscription } = payload;

  const existing = await SuperTenant.findOne({ subdomain });
  if (existing) {
    throw new Error("Subdomain already exists");
  }

  payload.tenantId = ("TENANTID-" + nanoid(12));

  if (!subscription?.expiryDate) {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    payload.subscription.expiryDate = expiry;
  }

  const tenant = await SuperTenant.create(payload);

  return tenant;
};

const getTenants = async () => {
  return await SuperTenant.find().lean();
}

const updateTenant = async (id, payload) => {
  return await SuperTenant.findByIdAndUpdate(id, payload, { new: true });
}

const deleteTenant = async(id)=>{
  return await SuperTenant.findByIdAndDelete(id);
}

export default {
  createTenant,
  getTenants,
  updateTenant,
  deleteTenant
};