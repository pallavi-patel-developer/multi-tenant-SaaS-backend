import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const superAdminSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
      type:String,
      required:true
    },
    role:{
      type:String,
      enum:["superAdmin"],
      default:"superAdmin"
    }
    
  },
  {
    timestamps:true
  }
);

superAdminSchema.pre('save',async function(){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
  }
})

// Password verify karne ka method — bcrypt plain aur hashed compare karta hai
superAdminSchema.methods.comparePassword = async function(plainPassword){
  return bcrypt.compare(plainPassword, this.password);
}

export default mongoose.model("SuperAdmin",superAdminSchema);