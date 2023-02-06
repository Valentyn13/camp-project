import axios from 'axios';
import { ICreate } from '../../common/types/todo.types';

const API_URL = 'http://localhost:4200/api';
axios.defaults.baseURL = API_URL;
export const TodoService = {
  async getAll() {
    return axios.get('/todos/todos');
  },
  async deleteByID(_id: string) {
    return axios.delete(`/todos/todos/${_id}`);
  },
  async create(body: ICreate) {
    const data = {
      title: body.title,
      content: body.content,
      createdAt: '12-01-23'
    };
    return axios.post('/todos/todos', data);
  },
  async update(_id: string, body: object) {
    return axios.put(`/todos/todos/${_id}`, body);
  }
};
