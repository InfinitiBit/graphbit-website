import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle Mongoose CastError
const handleCastErrorDB = (err: any): CustomError => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new CustomError(message, 400);
};

// Handle Mongoose duplicate key error
const handleDuplicateFieldsDB = (err: any): CustomError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new CustomError(message, 400);
};

// Handle Mongoose ValidationError
const handleValidationErrorDB = (err: any): CustomError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new CustomError(message, 400);
};

// Handle JWT errors
const handleJWTError = (): CustomError =>
  new CustomError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (): CustomError =>
  new CustomError('Your token has expired! Please log in again.', 401);

// Send error response for development
const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Send error response for production
const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    logger.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log the error
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific MongoDB/Mongoose errors
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

// Wrapper for async functions to catch errors
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

// Create error helper functions
export const createError = (message: string, statusCode: number): CustomError => {
  return new CustomError(message, statusCode);
};

export const badRequest = (message: string = 'Bad Request'): CustomError => {
  return new CustomError(message, 400);
};

export const unauthorized = (message: string = 'Unauthorized'): CustomError => {
  return new CustomError(message, 401);
};

export const forbidden = (message: string = 'Forbidden'): CustomError => {
  return new CustomError(message, 403);
};

export const notFound = (message: string = 'Not Found'): CustomError => {
  return new CustomError(message, 404);
};

export const conflict = (message: string = 'Conflict'): CustomError => {
  return new CustomError(message, 409);
};

export const unprocessableEntity = (message: string = 'Unprocessable Entity'): CustomError => {
  return new CustomError(message, 422);
};

export const internalServerError = (message: string = 'Internal Server Error'): CustomError => {
  return new CustomError(message, 500);
};

export default errorHandler;