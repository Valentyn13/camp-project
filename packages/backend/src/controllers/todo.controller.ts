import { IRequest } from '../types/service.type';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo() {
    const todos = await this.todoService.findAll();
    return todos;
  }

  async addTodo(req: IRequest) {
    const newTodo = await this.todoService.createTodo(req.body);
    return newTodo;
  }

  async deleteTodoById(req: IRequest) {
    const todoToDelete = await this.todoService.deleteTod(req.params.id);
    return todoToDelete;
  }

  async setTodoById(req: IRequest) {
    const setTodo = await this.todoService.updateTodo(req.params.id, req.body);
    return setTodo;
  }

  async findTodoById(req: IRequest) {
    const findTodo = await this.todoService.findById(req.params.id);
    return findTodo;
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
