import jwt from 'jsonwebtoken';
import SuperAdmin from './superAdmin.models.js';
import superRoleSchema from '../superRole/superRole.models.js';

const login = async(req,res)=>{
   try{
    const {email , password} = req.body;
    
    // First: Check SuperAdmin collection
    const admin = await SuperAdmin.findOne({email});
    if (admin) {
      const ispassword = await admin.comparePassword(password);
      if(!ispassword) return res.status(401).json({message:"Password is incorrect"});
      
      const token = jwt.sign(
        { id:admin._id, role:admin.role },
        process.env.JWT_SECRET,
        { expiresIn:'7d' }
      );
      console.log("===================== SUPERADMIN TOKEN ========================== ", token);
      return res.status(200).json({message:"Login successfull",token,admin:{id:admin._id,name:admin.name,email:admin.email,role:admin.role}});
    }

    // Second: Check SuperRole collection
    const role = await superRoleSchema.findOne({roleEmail: email});
    if (role) {
      const ispassword = await role.comparePassword(password);
      if(!ispassword) return res.status(401).json({message:"Password is incorrect"});
      
      const token = jwt.sign(
        { id:role._id, role:role.roleName, permissions: role.permissions },
        process.env.JWT_SECRET,
        { expiresIn:'7d' }
      );
      console.log("===================== SUPERROLE TOKEN ========================== ", token);
      return res.status(200).json({message:"Login successfull",token,role:{id:role._id,name:role.roleName,email:role.roleEmail,permissions:role.permissions}});
    }

    // If neither matched
    return res.status(401).json({message:"EMAIL NOT FOUND"});
    
   }
   catch(e){
      res.status(500).json({message:"Internal server error in LOGIN",error:e.message});
   }
}

export {login}