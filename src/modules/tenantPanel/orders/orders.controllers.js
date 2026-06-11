import { Order } from "./orders.model.js";

export const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, items, totalAmount, status } = req.body;
    const { tenantId } = req.user;

    const newOrder = await Order.create({
      tenantId,
      customerName,
      customerEmail,
      items,
      totalAmount,
      status,
    });

    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const orders = await Order.find({ tenantId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id, tenantId },
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const deletedOrder = await Order.findOneAndDelete({ _id: id, tenantId });

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
