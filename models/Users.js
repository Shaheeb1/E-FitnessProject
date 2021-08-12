import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema
({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {type: Boolean, required: true, default: false},

}, 
{
   timestamps: true,
}
);

const Users = 
mongoose.models.Users || mongoose.model('Users', usersSchema);
export default Users;