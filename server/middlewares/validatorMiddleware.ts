import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/apiError';


export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
  }
  return next();
}

export default validate;