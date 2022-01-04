import { getRepository, In } from "typeorm";
import { Book } from "../../entity/Book";
import { getPaginatedList } from "../../utils/serviceUtils";
import { BookPostData } from "./bookTypes";
import { Category } from "../../entity/Category";
import { Author } from "../../entity/Author";


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



/* 
SELECT 
  books.uuid AS "bookUuid", 
  books.name AS "bookName", 
  categories.uuid AS "categoryUuid", 
  categories.name AS "categoryName"
FROM books
LEFT JOIN categories
ON categories.id = books."categoryId"
WHERE books.uuid = :id;
*/


type BookGetItemConfig = {
  withCategory?: boolean;
  withAuthors?: boolean;
};

export const getItem = async (
  uuid: string, config?: BookGetItemConfig
) => {
  const { withCategory, withAuthors } = config!;
  
  const bookQueryBuilder = getRepository(Book).createQueryBuilder('book')
    .where({ uuid });
  
  if (withCategory) {
    bookQueryBuilder
    .addSelect(['category.uuid', 'category.name'])
    .leftJoin('book.category', 'category')
  }

  if(withAuthors) {
    bookQueryBuilder
    .addSelect(['authors.uuid', 'authors.name'])
    .leftJoin('book.authors', 'authors')
  }

  return await bookQueryBuilder.getOne();
}



export const create = async (data: BookPostData) => {

  const { name, isbn, description, categoryId, authorsIds } = data;

  const category = categoryId
    ? await Category.findOne({ uuid: categoryId}, {select: ['id']})
    : undefined;

  const authors = authorsIds && authorsIds.length
    ? await Author.find({ 
      select: ['id'],
      where: { uuid: In(authorsIds as string[]) }
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



export const edit = async (bookUuid: string, data: BookPostData) => {

  const { name, isbn, description, categoryId, authorsIds } = data;

  const category = categoryId
    ? await Category.findOne({ uuid: categoryId }, { select: ['id'] })
    : undefined;

  const authors = authorsIds
    ? await Author.find({
      select: ['id'],
      where: { uuid: In(authorsIds as string[]) }
    })
    : undefined;

  const book = await Book.findOneOrFail({ uuid: bookUuid });

  Object.assign(book, {
    name,
    isbn,
    description,
    category,
    authors
  });

  await book.save();

  return book;
}


export const remove = async (id: string) => {
  const deletingBook = await Book.findOneOrFail({uuid: id});
  await Book.delete({ uuid: id });
  return deletingBook;
}


const bookService = {
  create,
  edit,
  getItem,
  getList,
  remove
}

export default bookService;
