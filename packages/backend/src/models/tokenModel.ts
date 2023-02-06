import { Model, model, Schema } from 'mongoose';

export interface IToken {
  user: string;
  refreshToken: string;
}
const userSchema = new Schema<IToken>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, unique: true }
});

const Token: Model<IToken> = model('Token', userSchema);
export default Token;
