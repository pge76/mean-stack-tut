import mongoose, { Schema } from 'mongoose'

const AccountSchema: Schema = new Schema({
  _id: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String }
})

export default mongoose.model('Account', AccountSchema);