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
import SuperCategory from '../modules/superCategories/superCategories.models.js';
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';

const createTenant = async (payload) => {
  const { subdomain, subscription } = payload;

  const existing = await SuperTenant.findOne({ subdomain });
  if (existing) {
    throw new Error("Subdomain already exists");
  }

  const emailExist = await SuperTenant.findOne({ 'owner.email': payload.owner.email });
  if (emailExist) {
    throw new Error("Email already exists");
  }

  const phoneExist = await SuperTenant.findOne({ 'owner.phone': payload.owner.phone })
  if (phoneExist) {
    throw new Error("Phone already exists");
  }

  const gstExist = await SuperTenant.findOne({ 'business.gstNumber': payload.business.gstNumber })
  if (gstExist) {
    throw new Error("GST already exists");
  }

  const panExist = await SuperTenant.findOne({ 'pan': payload.pan })
  if (panExist) {
    throw new Error("PAN already exists");
  }

  payload.tenantId = ("TENANTID-" + nanoid(12));
  const plainPassword = `${nanoid(4)}-${nanoid(4)}-${nanoid(4)}`;
  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  payload.owner.password = hashedPassword;

  if (!subscription?.expiryDate) {
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    payload.subscription.expiryDate = expiry;
  }
  const businessType = payload.business?.type?.toLowerCase();
  if (businessType) {
    const category = await SuperCategory.findOne({ type: businessType }).lean();
    if (category && category.features?.length > 0) {
      payload.feature_flags = category.features;
    } else {
      payload.feature_flags = [];
    }
  }

  const tenant = await SuperTenant.create(payload);

  return { tenant, plainPassword };
};

const getTenants = async () => {
  const tenants = await SuperTenant.find().lean().sort({ createdAt: -1 });
  return tenants;
}

const getTenantById = async (id) => {
  const tenant = await SuperTenant.findById(id).lean();
  if (!tenant) {
    const error = new Error("Tenant not found");
    error.statusCode = 404;
    throw error;
  }
  return tenant;
}

const updateTenant = async (id, payload) => {
  return await SuperTenant.findByIdAndUpdate(id, payload, { returnDocument: 'after' });
}

const deleteTenant = async (id) => {
  return await SuperTenant.findByIdAndDelete(id);
}

export default {
  createTenant,
  getTenants,
  getTenantById,
  updateTenant,
  deleteTenant
};