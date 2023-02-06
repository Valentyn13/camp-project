import joi from 'joi';
import { ITodo } from '../models/Todo';

export const validateTodo = (todoData: ITodo) => {
  const todoShema = joi.object<ITodo>({
    title: joi.string().min(3).trim().required(),
    content: joi.string().min(3).trim().required(),
    createdAt: joi.string().required(),
    status: joi.boolean().default(false)
  });

  return todoShema.validate(todoData);
};
