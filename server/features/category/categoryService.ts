import { getManager, getRepository, ILike } from "typeorm"
import { Category } from "../../entity/Category";
import { CategoryPostData } from "./categoryTypes";
import { getPaginatedList } from "../../utils/serviceUtils";
import ApiError from "../../exceptions/apiError";

export const getList = async (page: number, rowsPerPage = 10) => {

  return await getPaginatedList(
    getRepository(Category),
    {
      select: ['uuid', 'name', 'createdAt', 'updatedAt'],
      page,
      rowsPerPage,
      order: {
        updatedAt: 'DESC'
      }
    }
  );
}



type CategoryGetItemConfig = {
  withParent?: boolean;
}

export const getItem = async (id: string, config?: CategoryGetItemConfig ) => {

  const { withParent } = config!;

  const categoryQueryBuilder = getRepository(Category).createQueryBuilder('categories')
    .select(['categories.uuid', 'categories.name', 'categories.description'])
    .where({ uuid: id });

  if (withParent) {
    categoryQueryBuilder
      .addSelect(['parent.uuid', 'parent.name'])
      .leftJoin('categories.parent', 'parent')
  }

  const result = await categoryQueryBuilder.getOne();
  return result || ApiError.NotFound();
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




export const edit = async (id: string, {name, description, parentId}: CategoryPostData) => {
  // const categoryQueryBuilder = getRepository(Category).createQueryBuilder('category');

  const editingCategory = await Category.findOneOrFail({ uuid: id });
  const newParent = parentId ? await Category.findOneOrFail({ uuid: parentId }) : null;


  // если назначаем батю
  // запрашиваем всех предков от назначаемого бати (parentId) до верха
  // смотрим, нет ли текущей категории (id) в предках у бати
    // если нет - спокойно переназначаем батю
    // если есть
      // - сносим батю назначаемого бати
      // - изменяемой категории назначаем назначаемого батю

  if(parentId) {
    const parentAncestors = await getAllAncestors(parentId);
    const checkedCategory = parentAncestors.some(({ uuid }: any) => uuid === id);

    if (checkedCategory) {
      if(newParent) {
        newParent.parent = null;
        await newParent.save();
      }
    }
  }

  Object.assign(editingCategory, {
    name, description, parent: newParent
  });
  await editingCategory.save();

  return editingCategory;
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
      name: ILike(`%${search.toString()}%`)
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



/*
--- список дочерних категорий указанной родительской и количество их детей uuid, name, childCount
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
  categories1."parentId" IS :parentId
GROUP BY categories1.id;
*/

export const childCategories = async (parentId: string) => {
  const queryBuilder = getRepository(Category).createQueryBuilder('categories1');

  const parentQuery = queryBuilder
    .select(['id'])
    .where('uuid = :parentId', { parentId })
    .getQuery();

  const data: any = await queryBuilder
    .select(['categories1.uuid as uuid', 'categories1.name as name'])
    .addSelect('COUNT(categories2.id) as "childCount"')
    .leftJoin('categories', 'categories2', 'categories2."parentId" = categories1.id')
    .where(`categories1."parentId" = (${parentQuery})`, { parentId })
    .groupBy('categories1.id')
    .getRawMany();


  const result: CategoriesTreeInfo[] = data.map((item: any) =>
    ({ ...item, childCount: parseInt(item.childCount) })
  );

  return result;
}



 
const getAllAncestors = async (categoryId: string) => {

  const data = await getManager().query(`
    WITH RECURSIVE ancestors AS (

    SELECT 
      anchor."id", 
      anchor."uuid", 
      anchor."parentId"
    FROM 
      categories anchor
    WHERE anchor."uuid" = $1
    
    UNION

    SELECT
      c."id",
      c."uuid",
      c."parentId"
    FROM
      categories c
    INNER JOIN ancestors a ON a."parentId" = c."id"
    
    ) SELECT * FROM ancestors
  `, [categoryId]);
  
  return data;
}


const categoryService = {
  create,
  edit,
  getItem,
  getList,
  remove,
  search,
  rootCategories,
  childCategories,
  categoryWithBooks
}

export default categoryService;