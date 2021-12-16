import categoryService from '../services/categoryService';
import createCrudController from '../features/crudController/crudController';
import { Request, Response, NextFunction } from 'express';


const categoryCrudController = createCrudController(categoryService);
export default {
  ...categoryCrudController,

  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query;
      const result = await categoryService.search(search as string);
      res.json(result);
    }
    catch (e) {
      next(e);
    }
  },

  categoryWithBooks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await categoryService.categoryWithBooks(id);
      res.json(result);
    } catch(e) {
      next(e);
    }
  },

  root: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await categoryService.rootCategories();
      res.json(result);
    } catch(e) {
      next(e);
    }
  },

  categoryChildren: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await categoryService.childCategories(id);
      res.json(result);
    } catch(e) {
      next(e);
    }
  },
};
