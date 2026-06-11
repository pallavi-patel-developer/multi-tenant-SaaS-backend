import { Product } from "./products.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock, status } = req.body;
    const { tenantId } = req.user;
    const newProduct = await Product.create({ tenantId, name, category, price, stock, status });
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const products = await Product.find({ tenantId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    await Product.findOneAndDelete({ _id: id, tenantId });
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
