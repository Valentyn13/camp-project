import { Request } from 'express';
import { ITodo } from './todos.type';

export interface IRequest extends Request {
  body: ITodo;
  params: {
    id: string;
  };
}
