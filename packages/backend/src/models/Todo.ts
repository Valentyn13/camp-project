import { Model, model, Schema } from 'mongoose';

export interface ITodo {
  title: string;
  content: string;
  createdAt: string;
  status: boolean;
}

const TodoShema = new Schema<ITodo>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, required: true },
  status: { type: Boolean, required: true, default: false }
});
const Todo: Model<ITodo> = model('Todo', TodoShema);
export default Todo;
