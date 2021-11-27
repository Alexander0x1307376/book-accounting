import { getRepository, In } from "typeorm";
import { Book } from "../entity/Book";
import { getPaginatedList, PaginationData } from "../utils/serviceUtils";
import { BookPostData } from "../types";
import { Category } from "../entity/Category";
import { Author } from "../entity/Author";
import { DataService } from "../features/crudController/crudController";


export const getList = async (page: number, rowsPerPage = 10) => {

  return await getPaginatedList(
    getRepository(Book),
    {
      select: ['uuid', 'name', 'createdAt', 'updatedAt'],
      page,
      rowsPerPage,
      order: {
        createdAt: 'ASC'
      }
    }
  );
}

export const getItem = async (uuid: string) => {
  const author = await Book.findOneOrFail({ uuid });
  return author;
}

export const create = async (data: BookPostData) => {

  const category = await Category.findOne({ uuid: data.categoryId}, {select: ['id']});
  const authors = await Author.find({ 
    select: ['id'],
    where: { uuid: In(data.authorsId as string[]) }
  });

  const book = Book.create({
    name: data.name,
    isbn: data.isbn,
    description: data.description,
    category,
    authors
  });

  await book.save();
  return book;
}

export const edit = async (id: string, data: BookPostData) => {
  const book = await Book.findOneOrFail({ uuid: id });
  Object.assign(book, data);
  return await book.save();
}

export const remove = async (id: string) => {
  const deletingBook = await Book.findOneOrFail({uuid: id});
  await Book.delete({ uuid: id });
  return deletingBook;
}

const bookService: DataService<BookPostData, Book, PaginationData<Book>> = {
  create,
  edit,
  getItem,
  getList,
  remove
}

export default bookService;
