
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true , minlength: 6},
  gender: { type: String, enum: ['male', 'female'], required: true }, // Change to String and restrict to 'male' or 'female'
  profilePic: { type: String, required: true },
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
