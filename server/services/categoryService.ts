import { getRepository } from "typeorm"
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

export const create = async (data: CategoryPostData) => {
  const category = Category.create(data);

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


const categoryService: DataService<CategoryPostData, Category, PaginationData<Category>> = {
  create,
  edit,
  getItem,
  getList,
  remove
}

export default categoryService;