import express from 'express';
import * as TenantAuthService from '../services/tenantAuth.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await TenantAuthService.loginTenant(email, password);
        res.status(200).json({ message: "Login Sucessfully", result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
