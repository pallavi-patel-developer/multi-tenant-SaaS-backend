import { Inventory } from "./inventory.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, sku, category, price, stock, threshold } = req.body;
    const { tenantId } = req.user;

    const newProduct = new Inventory({
      tenantId,
      name,
      sku,
      category,
      price,
      stock,
      threshold,
    });
    
    await newProduct.save(); // save is used to trigger pre-save hook

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const products = await Inventory.find({ tenantId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const product = await Inventory.findOne({ _id: id, tenantId });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    Object.assign(product, req.body);
    await product.save(); // trigger pre-save hook

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const deletedProduct = await Inventory.findOneAndDelete({ _id: id, tenantId });

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
