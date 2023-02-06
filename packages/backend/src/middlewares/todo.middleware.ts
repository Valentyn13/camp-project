import { Request, Response, NextFunction } from 'express';
import { MyCustomError } from './error.middleware';
import { validateTodo } from './validation';

class TodoMiddleware {
  async todoValidate(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = validateTodo(req.body);
      if (error) {
        throw new MyCustomError(400, 'Bad input');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
// i - instance
export const iTodoMiddleware = new TodoMiddleware();
