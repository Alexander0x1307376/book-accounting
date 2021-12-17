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
        createdAt: 'DESC'
      }
    }
  );
}

export const getItem = async (uuid: string) => {
  const author = await Book.findOneOrFail({ uuid });
  return author;
}

export const create = async ({name, isbn, description, categoryId, authorsId}: BookPostData) => {

  const category = categoryId
    ? await Category.findOne({ uuid: categoryId}, {select: ['id']})
    : undefined;

  const authors = authorsId 
    ? await Author.find({ 
      select: ['id'],
      where: { uuid: In(authorsId as string[]) }
    })
    : undefined;

  const book = Book.create({
    name,
    isbn,
    description,
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
