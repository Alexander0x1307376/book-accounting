import categoryService from '../services/categoryService';
import createCrudController from '../features/crudController/crudController';

const categoryCrudController = createCrudController(categoryService);
export default categoryCrudController;
