import {mongoose, Schema} from 'mongoose';
const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], required: true },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }], 
    notificationsEnabled: { type: Boolean, default: true } ,
    
  });
  const User=mongoose.model('User', UserSchema);
  export default User;