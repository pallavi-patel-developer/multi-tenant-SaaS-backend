import SuperCategorySchema from './superCategories.models.js';
import { getAllCategories, upsertCategory } from '../superCategories.service.js'


export const getCategories = async (req, res) => {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
};

export const saveCategory = async (req, res) => {
    const { type } = req.params;
    const { label, features } = req.body;

    const saved = await CategoryService.upsertCategory(type, label, features);
    res.status(200).json({ success: true, data: saved });
};
