import { Request, Response, NextFunction } from 'express';
import { CustomError } from './errorHandler';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new CustomError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(error);
};

export default notFoundHandler;