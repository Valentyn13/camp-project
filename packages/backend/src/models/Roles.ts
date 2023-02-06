import { Model, model, Schema } from 'mongoose';

export interface IRole {
  value: string;
}
const userSchema = new Schema<IRole>({
  value: { type: String, unique: true }
});

const Role: Model<IRole> = model('Role', userSchema);
export default Role;
