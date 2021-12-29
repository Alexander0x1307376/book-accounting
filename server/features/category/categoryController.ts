import categoryService from './categoryService';
import { controllerFunction as cf } from '../controller';
import { TypedRequestBody } from '../http/types';
import { CategoryPostData } from './categoryTypes';


export default {

  show: cf(async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.getItem(id);
    res.json(result);
  }),


  create: cf(async (req: TypedRequestBody<CategoryPostData>, res) => {
    const data = <CategoryPostData>req.body;
    const result = await categoryService.create(data);
    res.json(result);
  }),


  edit: cf(async (req: TypedRequestBody<CategoryPostData>, res) => {
    const { id } = <{ id: string }>req.params;
    const data = req.body;
    const result = await categoryService.edit(id, data);
    res.json(result);
  }),


  remove: cf(async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.remove(id);
    res.json(result);
  }),


  list: cf(async (req, res) => {
    const { page } = req.params;
    const result = await categoryService.getList(+page);
    res.json(result);
  }),


  search: cf(async (req, res) => {
    const { search } = req.query;
    const result = await categoryService.search(search as string);
    res.json(result);
  }),


  categoryWithBooks: cf(async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.categoryWithBooks(id);
    res.json(result);
  }),

  
  root: cf(async (req, res) => {
    const result = await categoryService.rootCategories();
    res.json(result);
  }),


  categoryChildren: cf(async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.childCategories(id);
    res.json(result);
  }),
}