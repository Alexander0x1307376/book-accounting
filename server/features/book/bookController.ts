import bookService from './bookService';
import { controllerFunction as cf } from '../controller';
import { TypedRequestBody, TypedRequestQuery } from '../http/types';
import { BookPostData } from './bookTypes';
export default {

  show: cf(async (req, res) => {
    const {id} = req.params;
    const result = await bookService.getItem(id);
    res.json(result);
  }),


  create: cf(async (req, res) => {
    const data = <BookPostData>req.body;
    const result = await bookService.create(data);
    res.json(result);
  }),


  edit: cf(async (req: TypedRequestBody<BookPostData>, res) => {
    const { id } = <{ id: string }>req.params;
    const data = req.body;
    const result = await bookService.edit(id, data);
    res.json(result);
  }),


  remove: cf(async (req, res) => {
    const { id } = req.params;
    const result = await bookService.remove(id);
    res.json(result);
  }),


  list: cf(async (req, res) => {
    const { page } = req.params;
    const result = await bookService.getList(+page);
    res.json(result);
  })
}