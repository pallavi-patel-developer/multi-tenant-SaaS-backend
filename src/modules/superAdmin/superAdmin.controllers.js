import jwt from 'jsonwebtoken';
import SuperAdmin from './superAdmin.models.js';

const login = async(req,res)=>{
   try{
    const {email , password} = req.body;  //SuperAdmin collection hai
    const admin = await SuperAdmin.findOne({email});  //ye admin document hai
    if (!email) return res.status(401).json({message:"EMAIL NOT FOUND"});
    
    const ispassword = await admin.comparePassword(password);
    if(!ispassword) return res.status(401).json({message:"Password is incorrect"});
    const token = jwt.sign(
      {
        id:admin._id,  //payload
        role:admin.role
      },
      process.env.JWT_SECRET,  //secret key
      {
        expiresIn:'7d'  //expiry time
      }
    );
    res.status(200).json({message:"Login successfull",token,admin:{id:admin._id,name:admin.name,email:admin.email,role:admin.role}});
     
    
   }
   catch(e){
      res.status(500).json({message:"Internal server error in LOGIN SUPERADMIN",error:e.message});
   }
}

export {login}