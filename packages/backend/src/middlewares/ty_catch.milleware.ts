import { Request, Response, NextFunction } from 'express';
// import { MyCustomError } from './error.middleware';

export const tryCatch =
  (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller(req, res, next);
      if (response) {
        return res.status(200).json(response);
      }
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
