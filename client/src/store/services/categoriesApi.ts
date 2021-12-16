import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CategoryListResponse, CategoryRecord } from '../../types';
import { insertCategories } from '../categoriesSlice';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Category'],
  endpoints: build => ({

    categories: build.query<CategoryListResponse, number>({
      query: (page: number) => `categories/${page}`
    }),

    categoryDetails: build.query<CategoryRecord, string>({
      query: (lobbyUuid: string) => `category/${lobbyUuid}`
    }),

    categoriesSearch: build.query<CategoryRecord[], string>({
      query: (search: string) => `categories/search?search=${search}`
    }),

    categoriesRoots: build.query<CategoryRecord[], void>({
      query: () => `categories/root`,
      onQueryStarted: async(id, { dispatch, queryFulfilled }) => {
        try {
          // console.log('categories/root query')
          const { data } = await queryFulfilled;
          dispatch(insertCategories({children: data}));
        } catch (e) {
          console.log('ERROR!!!');
        }
      }
    }),

    categoryChildren: build.query<CategoryRecord[], string>({
      query: (uuid: string) => `category/${uuid}/children`,
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(insertCategories({parentId: id, children: data}))
      }
    })

  })
});

export const { 
  useCategoriesQuery, 
  useCategoryDetailsQuery,
  useCategoriesSearchQuery,
  useCategoriesRootsQuery,
  useCategoryChildrenQuery,

  useLazyCategoryChildrenQuery,
} = categoriesApi;

export const {
  useLazyQuerySubscription
} = categoriesApi.endpoints.categoryChildren
