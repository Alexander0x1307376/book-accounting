import { getRepository, IsNull, Like } from "typeorm"
import { Category } from "../entity/Category"
import { DataService } from "../features/crudController/crudController"
import { CategoryPostData } from "../types"
import { getPaginatedList, PaginationData } from "../utils/serviceUtils"

export const getList = async (page: number, rowsPerPage = 10) => {

  return await getPaginatedList(
    getRepository(Category),
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

export const getItem = async (id: string) => {
  const category = await Category.findOneOrFail({ uuid: id });
  return category;
}

export const create = async ({name, description, parentId}: CategoryPostData) => {

  const parent = parentId
    ? await Category.findOne({ uuid: parentId }, { select: ['id'] })
    : undefined;

  const category = Category.create({
    name,
    description,
    parent
  });

  await category.save();
  return category;
}

export const edit = async (id: string, data: CategoryPostData) => {
  const category = await Category.findOneOrFail({ uuid: id });
  Object.assign(category, data);
  return await category.save();
}

export const remove = async (id: string) => {
  const deletingCategory = await Category.findOneOrFail({ uuid: id });
  await Category.delete({ uuid: id });
  return deletingCategory;
}

export const categoryWithBooks = async (id: string) => {
  const categoryQueryBuilder = getRepository(Category).createQueryBuilder('categories');
  const category = await categoryQueryBuilder
    .where({uuid: id})
    .select([ 'categories.id', 'categories.name', 'book.uuid', 'book.name' ])
    .leftJoin('categories.books', 'book')
    .getOne();
  return category;
}

export const search = async (search: string, limit: number = 5) => {
  const result = await Category.find({
    select: ['uuid', 'name'],
    where: {
      name: Like(`%${search}%`)
    },
    take: limit
  });
  return result;
}



/*
--- список категорий без родителей и количество их детей uuid, name, childCount
SELECT 
  categories1.id as cat_id,
  categories1.name as cat_name,
  COUNT(DISTINCT categories2.id) as children
FROM 
  categories categories1
LEFT JOIN 
  categories categories2
ON 
  categories2."parentId" = categories1.id
WHERE 
  categories1."parentId" IS NULL
GROUP BY categories1.id;
*/

type CategoriesTreeInfo = {
  uuid: string,
  name: string,
  childCount: number
}

export const rootCategories = async () => {
  const categoryQueryBuilder = getRepository(Category).createQueryBuilder('categories1');
  const data: any = await categoryQueryBuilder
    .select([ 'categories1.uuid as uuid', 'categories1.name as name' ])
    .addSelect('COUNT(categories2.id) as "childCount"')
    .leftJoin('categories', 'categories2', 'categories2."parentId" = categories1.id')
    .where('categories1."parentId" IS NULL')
    .groupBy('categories1.id')
    .getRawMany();

  const result: CategoriesTreeInfo[] = data.map((item: any) => 
    ({...item, childCount: parseInt(item.childCount)})
  );

  return result;
}

export const childCategories = async (parentId: string) => {
  const queryBuilder = getRepository(Category).createQueryBuilder('categories');

  const parentQuery = queryBuilder
    .select(['categories.id'])
    .where('categories.uuid = :uuid', { uuid: parentId })
    .getQuery();

  const children = await queryBuilder 
    .select(['categories.uuid', 'categories.name'])
    .where(`categories."parentId" = (${parentQuery})`, { uuid: parentId })
    .getMany();
    
  return children;
}


const categoryService: DataService<CategoryPostData, Category, PaginationData<Category>>
  & { 
    categoryWithBooks: typeof categoryWithBooks, 
    childCategories: typeof childCategories, 
    rootCategories: typeof rootCategories,
    search: typeof search,
  }
 = {
  create,
  edit,
  getItem,
  getList,
  remove,
  search,
  rootCategories,
  childCategories,
  categoryWithBooks,
}

export default categoryService;