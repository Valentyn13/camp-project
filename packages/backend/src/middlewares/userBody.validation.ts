import joi from 'joi';
import { IUserBody } from '../models/User';

export const validateUserBody = (todoData: IUserBody) => {
  const userBodySchema = joi.object<IUserBody>({
    username: joi.string().min(3).trim().required(),
    password: joi.string().min(4).trim().required(),
    email: joi.string().email().required()
  });

  return userBodySchema.validate(todoData);
};
