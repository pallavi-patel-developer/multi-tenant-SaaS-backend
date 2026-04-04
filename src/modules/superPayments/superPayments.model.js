import mongoose from 'mongoose';

const superPaymentSchema= new mongoose.Schema({
  gatewayName:{
    type:String,
    enum:['Razorpay','Stripe','Paypal'],
    required:true
  },
  tenantName:{
    type:String,
    required:true
  },
  tenantEmail: {
    type: String,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'createdByModel', 
    required: true
  },
  createdByModel: {
    type: String,
    required: true    
  }

}, { timestamps: true });

export default mongoose.model('SuperPayment',superPaymentSchema);