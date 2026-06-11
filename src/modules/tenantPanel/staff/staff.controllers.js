import { Staff } from "./staff.model.js";

export const createStaff = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const { tenantId } = req.user;

    const newStaff = await Staff.create({
      tenantId,
      name,
      email,
      role,
      status,
    });

    return res.status(201).json({ success: true, data: newStaff });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getStaff = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const staff = await Staff.find({ tenantId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: staff });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const updatedStaff = await Staff.findOneAndUpdate(
      { _id: id, tenantId },
      req.body,
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    return res.status(200).json({ success: true, data: updatedStaff });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const deletedStaff = await Staff.findOneAndDelete({ _id: id, tenantId });

    if (!deletedStaff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    return res.status(200).json({ success: true, message: "Staff deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
