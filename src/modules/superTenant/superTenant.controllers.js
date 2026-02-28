const SuperTenant = require('./superTenant.models');

exports.createTenant = async(req,res)=>{
  try{
    const {businessName, subdomain, ownerEmail, plan, expiry} = req.body;
    const newTenant = new SuperTenant({
      id,
      businessName,
      subdomain,
      ownerEmail,
      plan,
      expiry
    });
    const savedTenant = await newTenant.save();
    res.status(201).json({ success: true, data: savedTenant });
  }catch(error){
    console.error("Error creating tenant:", error);
    res.status(500).json({ success: false, message: "Failed to create tenant" });
  }
}
exports.getTenants = async(req,res)=>{
  try{
    const tenants = await SuperTenant.find().lean();
    res.status(200).json({ success: true, data: tenants });
  }catch(error){
    console.error("Error fetching tenants:", error);
    res.status(500).json({ success: false, message: "Failed to fetch tenants" });
  }
}