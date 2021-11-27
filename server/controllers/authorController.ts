import createCrudController from '../features/crudController/crudController';
import authorService from '../services/authorService';


const authorController = createCrudController(authorService);
export default authorController;
