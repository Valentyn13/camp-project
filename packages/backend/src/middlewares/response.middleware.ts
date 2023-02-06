import { NextFunction, Response } from 'express';
import { IRequest } from '../types/service.type';
import { MyCustomError } from './error.middleware';

export const responseHandler =
  (fn: Function) =>
  async (req: IRequest, res: Response, next: NextFunction): Promise<any | NextFunction> => {
    try {
      const data = await fn(req, res, next);
      if (!data) {
        throw new MyCustomError(500, 'Not found');
      }
      return data;
    } catch (error) {
      next(error);
    }
  };
