import jwt from "jsonwebtoken";

const authenticate = (req,res,next)=>{
  try{
    const token = req.headers.authorization?.split(' ')[1]; // space se split -> convert into array -> ["Bearer", "token"]
    if(!token) return res.status(401).json({message:"Internal Server Error"});
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
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