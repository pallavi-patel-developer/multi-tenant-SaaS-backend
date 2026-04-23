import { getAllCategories, upsertCategory } from '../../services/superCategories.service.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const saveCategory = async (req, res) => {
    try {
        const { type } = req.params;
        const { label, features } = req.body;

        const saved = await upsertCategory(type, label, features);
        res.status(200).json({ success: true, data: saved });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
