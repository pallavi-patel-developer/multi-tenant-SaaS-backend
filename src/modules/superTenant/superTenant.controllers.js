// Controller ka kaam:

// request lena

// service ko call karna

// response bhejna

import SuperTenantService from '../../services/superTenant.service.js';
export const createTenant = async (req, res, next) => {
  try {
    const newTenant = await SuperTenantService.createTenant(req.body);
    res.status(201).json({ success: true, data: newTenant });
  } catch (error) {
    next(error);
  }
}
export const getTenants = async (req, res, next) => {
  try {
    const tenants = await SuperTenantService.getTenants();
    res.status(200).json({ success: true, data: tenants });
  } catch (error) {
    next(error);
  }
}

export const getTenantById = async (req, res, next) => {
  try {
    const tenant = await SuperTenantService.getTenantById(req.params.id);
    res.status(200).json({ success: true, data: tenant });
  } catch (error) {
    next(error);
  }
}

export const updateTenant = async (req, res, next) => {
  try {
    const updateTenant = await SuperTenantService.updateTenant(req.params.id, req.body);
    res.status(200).json({ success: true, data: updateTenant });
  } catch (error) {
    next(error);
  }
}

export const deleteTenant = async (req, res, next) => {
  try {
    const deleteTenant = await SuperTenantService.deleteTenant(req.params.id);
    res.status(200).json({ success: true, data: deleteTenant });
  } catch (error) {
    next(error);
  }
}