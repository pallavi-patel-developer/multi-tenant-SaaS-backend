import jwt from "jsonwebtoken";

const authenticate = (req,res,next)=>{
  try{
    const token= req.headers.authorization?.split('')[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
  /**
     jwt.verify() do kaam karta hai ek saath:
     Token valid hai ya nahi check karta hai
     Agar valid hai toh payload wapas deta hai (jo tune jwt.sign() mein daala tha)
  */
    req.user = decoded;   //agle middleware/controller ko user info pass krne ke liye
    next();
  }
  catch(e){
    res.status(500).json({message:"Internal server error in AUTHENTICATE SUPERADMIN",error:e.message});
  }
}

const authorizeSuperAdmin = (req,res,next)=>{
  try{
    if(req.user.role !== 'superAdmin'){
      return res.status(403).json({message:"FORBIDDEN"});
    }
    next();

  }catch(e){
    res.status(500).json({message:"Internal server error in AUTHORIZE SUPERADMIN",error:e.message});
  }
}

export {authenticate,authorizeSuperAdmin}