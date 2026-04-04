import SuperPayment from "./superPayments.model.js";
import SuperTenant from "../../modules/superTenant/superTenant.models.js"
// JWT mein jo role aata hai usse Model ka naam milta hai
// Jaise role = "superAdmin" → model name = "SuperAdmin"

const roleToModelName = (role) => {
  if (!role) return null;
  // Pehla letter capital → "superAdmin" → "SuperAdmin"
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const createSuperPayment = async (req, res) => {
  try {
    const { gatewayName, tenantName, tenantEmail } = req.body;
    // Mongoose mein nested field dhundne ke liye "owner.email" string format mein likhte hain.
    // Aur hum `tenantEmail` variable ki value search kar rahe hain, jo req.body se aayi hai.
    const tenant = await SuperTenant.findOne({ "owner.email": tenantEmail });
    console.log("tenant ===== ", tenant);
    
    // Agar tenant nahi mila, toh tenant `null` hoga.
    if (!tenant) {
      return res.status(404).json({ success: false, message: "This Email is not registered" });
    }
    // req.user → authenticate middleware ne JWT verify karke set kiya hai
    const createdBy = req.user.id;   // logged-in user ki _id
    const createdByModel = roleToModelName(req.user.role); // "superAdmin" → "SuperAdmin"

    if (!createdByModel) {
      return res.status(403).json({ success: false, message: "Role not found in token" });
    }

    const paymentConfig = await SuperPayment.create({
      gatewayName,
      tenantName,
      tenantEmail,
      createdBy,       // ← kon hai (ObjectId)
      createdByModel,  // ← kis model mein dhundna hai
    });
    console.log("paymentConfig ===== ", paymentConfig)
    //  check that tenantEmail must exist in SuperTenant model

    console.log("Payment Config created by:", createdByModel, createdBy);
    return res.status(201).json({ success: true, message: "Payment Created Successfully", data: paymentConfig });
  }
  catch (e) {
    console.log("Error in creating super payment", e);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: e.message });
  }
};

const getSuperPayment = async (req, res) => {
  try {
    const payments = await SuperPayment.find()
      .populate('createdBy', 'name email role') // ObjectId → actual user ka naam email
      .lean()                                    // ✅ lean() — brackets zaroori!
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: payments });
  }
  catch (e) {
    console.log("Error in getSuperPayment", e);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createSuperPayment, getSuperPayment };