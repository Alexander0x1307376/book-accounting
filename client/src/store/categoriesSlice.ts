import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; 
import { CategoryRecord } from '../types';

// ключ - uuid категории, батя знает о детях
export type Categories = {
  [key: string]: {
    name: string,
    parent?: string, //uuid родительской категории
    childCount?: number,
    children?: string[] //массив uuid дочерних категорий
  }
}

export interface CategoryTreeState {
  categories: Categories
}

const initialState: CategoryTreeState = {
  categories: {}
}

export const categoriesSlice = createSlice({
  name: 'categoryTree',
  initialState,
  reducers: {
    insertCategories: (state, action: PayloadAction<{parentId?: string, children: CategoryRecord[]}>) => {

      const { parentId, children } = action.payload;

      // если батя указан
      if(parentId) {
        // добавляем детей
        state.categories[parentId].children = action.payload.children.map(({uuid}) => uuid);
      }

      // добавляем сами записи
      children.forEach(item => {
        state.categories[item.uuid] = { ...item, parent: parentId }
      });
    }
  }
})

export const { insertCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
export const selectCategoriesTree = (state: RootState) => state.categories.categories;
export const selectRootCategories = (state: RootState) => {
  const { categories } = state.categories;
  const result = [];
  for(let key in categories) {
    if(categories[key].parent === undefined) {
      result.push(categories[key]);
    }
  }
  return result;
}