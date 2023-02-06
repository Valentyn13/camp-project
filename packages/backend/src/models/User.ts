import { Model, model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  isActivated: boolean;
  activalionLink: string;
  roles: string[];
}
export interface IUserBody {
  username: string;
  password: string;
  email: string;
}
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  roles: [{ type: String, ref: 'Role' }]
});

const MyUser: Model<IUser> = model('User', userSchema);
export default MyUser;
