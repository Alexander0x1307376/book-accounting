import { NextFunction, Request, Response } from 'express';
import createCrudController from '../features/crudController/crudController';
import authorService from '../services/authorService';



const crudController = createCrudController(authorService);

export default {
  ...crudController,
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query;
      const result = await authorService.search(search as string);
      res.json(result);
    }
    catch (e) {
      next(e);
    }
  }
};
