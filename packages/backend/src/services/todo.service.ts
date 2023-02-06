import Todo, { ITodo } from '../models/Todo';

export default class TodoService {
  async findAll() {
    const todosFromDb = Todo.find((err, value) => {
      if (err) {
        throw new Error(err.message);
      }
      return value;
    });
    return todosFromDb;
  }

  async createTodo(data: ITodo) {
    const { title, content, createdAt } = data;
    const post = await Todo.create({
      title,
      content,
      createdAt
    });
    return post;
  }

  async deleteTod(entryId: string) {
    const deletedTodo = await Todo.deleteOne({ _id: entryId });
    return deletedTodo;
  }

  async updateTodo(id: string, data: ITodo) {
    const postToUpdate = await Todo.findByIdAndUpdate(id, data, { new: true });
    return postToUpdate;
  }

  async findById(id: string) {
    const post = Todo.findById(id);
    return post;
  }
}
