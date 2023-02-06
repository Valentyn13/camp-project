import { NextFunction, Request, Response } from 'express';
import { MyCustomError } from './error.middleware';
import TodoService from '../services/todo.service';

const { ObjectId } = require('mongoose').Types;

export async function idValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> {
  const { id } = req.params;
  const isIdValid = ObjectId.isValid(id);

  if (!isIdValid) next(new MyCustomError(404, 'Invalid id'));
  next();
}

export async function isExist(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> {
  const { id } = req.params;
  const existTodo = await new TodoService().findById(id);
  if (!existTodo) {
    next(new MyCustomError(404, 'Todo is not found'));
  }
  next();
}
