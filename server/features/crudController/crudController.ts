import { Request, Response, NextFunction } from 'express';

export interface DataService<PostData, DataItem, ListData> {
  create: (data: PostData) => Promise<DataItem>,
  edit: (id: string, data: PostData) => Promise<DataItem>,
  remove: (id: string) => Promise<DataItem>,
  getItem: (id: string) => Promise<DataItem>,
  getList: (page: number) => Promise<ListData>,
}

export type ControllerMethod = (req: Request, res: Response, next: NextFunction) => void | Promise<void>

export interface OverrideMethods {
  create?: ControllerMethod,
  edit?: ControllerMethod,
  remove?: ControllerMethod,
  show?: ControllerMethod,
  list?: ControllerMethod
}

export const createCrudController = <
  PostData, DataItem, ListData
  >(service: DataService<PostData, DataItem, ListData>, 
    config?: {
      overrided?: OverrideMethods,
      // addictionalMethods?: Record<string, ControllerMethod>
    }
) => {

  const overrided = config?.overrided;
  // const addictionalMethods = config?.addictionalMethods;

  const controllerMethods = {

    list: overrided?.list 
    ? overrided.list 
    : async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { page } = req.params;
        const result = await service.getList(+page);
        res.json(result);
      } catch (e) {
        next(e);
      }
    },

    show: overrided?.show 
    ? overrided.show 
    : async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const result = await service.getItem(id);
        res.json(result);
      } catch (e) {
        next(e);
      }
    },

    create: overrided?.create 
    ? overrided.create 
    : async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = <PostData>req.body;
        const result = await service.create(data);
        res.json(result);
      } catch (e) {
        next(e);
      }
    },

    edit: overrided?.edit 
    ? overrided.edit 
    : async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const data = <PostData>req.body;
        const result = await service.edit(id, data);
        res.json(result);
      } catch (e) {
        next(e);
      }
    },

    remove: overrided?.remove
    ? overrided.remove
    : async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const result = await service.remove(id);
        res.json(result);
      } catch (e) {
        next(e);
      }
    }
  };

  return controllerMethods;
}

export default createCrudController;