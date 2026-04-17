import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const superRoleSchema = new Schema({
  roleName: {
    type: String,
    required: true
  },
  roleEmail: {
    type: String,
    required: true,
    unique: true
  },
  rolePassword: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  permissions: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }

},
  { timestamps: true }
)


superRoleSchema.pre('save', async function () {
  if (this.isModified('rolePassword')) {
    this.rolePassword = await bcrypt.hash(this.rolePassword, 10);
  }
})
superRoleSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.rolePassword);
}

const model = mongoose.model('superRole', superRoleSchema)
export default model