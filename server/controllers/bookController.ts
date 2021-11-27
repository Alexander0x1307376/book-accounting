import { Request, Response, NextFunction } from 'express';
import createCrudController from '../features/crudController/crudController';
import * as bookService from '../services/bookService';
import { BookPostData } from '../types';


export default createCrudController(bookService, {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = <BookPostData & { authorsId: string }>req.body;
      const foreignFields = {
        categoryId: data.categoryId,
        authorsId: data.authorsId.split(',').map((item: string) => item.trim()),
      }

      const result = await bookService.create(Object.assign(data, foreignFields));
      res.json(result);
    } catch (e) {
      next(e);
    }
  },
  edit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = <BookPostData & {authorsId: string}>req.body;

      const foreignFields = {
        categoryId: data.categoryId,
        authorsId: data.authorsId.split(',').map((item: string) => item.trim()),
      }
      const result = await bookService.edit(id, Object.assign(data, foreignFields));

      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
);