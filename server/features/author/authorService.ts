import { getRepository, ILike } from "typeorm";
import { Author } from "../../entity/Author";
import { AuthorPostData } from "./authorTypes";

import { getPaginatedList } from "../../utils/serviceUtils";

export const getList = async (page: number, rowsPerPage = 10) => {

  return await getPaginatedList(
    getRepository(Author),
    {
      select: ['uuid', 'name', 'birthDate', 'deathDate', 'createdAt', 'updatedAt'],
      page,
      rowsPerPage,
      order: {
        updatedAt: 'DESC'
      }
    }
  );
}

export const getItem = async (id: string) => {
  const author = await Author.findOneOrFail({ uuid: id });
  return author;
}

export const create = async (data: AuthorPostData) => {
  const author = Author.create(Object.assign(data, {
    birthDate: data.birthDate && new Date(data.birthDate),
    deathDate: data.deathDate && new Date(data.deathDate)
  }));

  await author.save();
  return author;
}

export const edit = async (id: string, data: AuthorPostData) => {

  const author = await Author.findOneOrFail({ uuid: id });
  Object.assign(author, data, {
    birthDate: data.birthDate ? new Date(data.birthDate) : null,
    deathDate: data.deathDate ? new Date(data.deathDate) : null
  });

  return await author.save();
}

export const remove = async (id: string) => {
  const deletingAuthor = await Author.findOneOrFail({ uuid: id });
  await Author.delete({ uuid: id });
  return deletingAuthor;
}

export const search = async (search: string, limit: number = 5) => {  
  const authors = await Author.find({
    select: ['uuid', 'name'],
    where: {
      name: ILike(`%${search.toString()}%`)
    },
    take: limit
  });
  return authors;
}


const authorService = {
  create,
  edit,
  getItem,
  getList,
  remove,
  search
}

export default authorService;

