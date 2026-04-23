import SuperCategory from '../modules/superCategories/superCategories.models.js';

const getAllCategories = async () => {
    return await SuperCategory.find().lean();
};

const upsertCategory = async (type, label, features) => {
    return await SuperCategory.findOneAndUpdate(
        { type },
        { type, label, features },
        { upsert: true, new: true }
    );
};

export {
    getAllCategories,
    upsertCategory
}