import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/token.service';
import { MyCustomError } from './error.middleware';

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | NextFunction> => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new MyCustomError(401, 'No auth [error from middleware]');
    }

    const accesToken = authorizationHeader.split(' ')[1];
    const validateTokenAndGetData = await TokenService.validateAccesToken(accesToken);
    if (!validateTokenAndGetData) {
      throw new MyCustomError(401, 'Invalid acces token [error from check auth middleware]');
    }
    req.user = validateTokenAndGetData;
    next();
  } catch (error) {
    next(error);
  }
};
