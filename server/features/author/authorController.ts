import authorService from './authorService';
import { controllerFunction as cf } from '../controller';
import { TypedRequestBody, TypedRequestQuery } from '../http/types';
import { AuthorPostData } from './authorTypes';
export default {

  show: cf(async (req, res) => {
    const {id} = req.params;
    const result = await authorService.getItem(id);
    res.json(result);
  }),


  create: cf(async (req, res) => {
    const data = <AuthorPostData>req.body;
    const result = await authorService.create(data);
    res.json(result);
  }),


  edit: cf(async (req: TypedRequestBody<AuthorPostData>, res) => {
    const { id } = <{ id: string }>req.params;
    const data = req.body;
    const result = await authorService.edit(id, data);
    res.json(result);
  }),


  remove: cf(async (req, res) => {
    const { id } = req.params;
    const result = await authorService.remove(id);
    res.json(result);
  }),


  list: cf(async (req, res) => {
    const { page } = req.params;
    const result = await authorService.getList(+page);
    res.json(result);
  }),


  search: cf(async (req: TypedRequestQuery<{ search: string }>, res) => {
    const { search } = req.query;
    const result = await authorService.search(search);
    res.json(result);
  })
}