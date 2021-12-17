import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CategoryInput, CategoryListResponse, CategoryRecord } from '../../types';
import { insertCategories } from '../categoriesSlice';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Category'],
  endpoints: build => ({

    categories: build.query<CategoryListResponse, number>({
      query: (page: number) => `categories/${page}`,
      providesTags: ['Category']
    }),

    categoryDetails: build.query<CategoryRecord, string>({
      query: (lobbyUuid: string) => `category/${lobbyUuid}`,
      providesTags: ['Category']
    }),

    categoriesSearch: build.query<CategoryRecord[], string>({
      query: (search: string) => `categories/search?search=${search}`,
      providesTags: ['Category']
    }),

    categoriesRoots: build.query<CategoryRecord[], void>({
      query: () => `categories/root`,
      onQueryStarted: async(id, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(insertCategories({children: data}));
        } catch (e) {
          console.log('ERROR!!!');
        }
      },
      providesTags: ['Category']
    }),

    categoryChildren: build.query<CategoryRecord[], string>({
      query: (uuid: string) => `category/${uuid}/children`,
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(insertCategories({parentId: id, children: data}))
      },
      providesTags: ['Category']
    }),

    createCategory: build.mutation<CategoryRecord, CategoryInput>({
    // createCategory: build.mutation<CategoryInput, CategoryRecord>({
      query: categoryInput => ({
        url: `category/create`,
        method: 'POST',
        body: categoryInput
      }),
      invalidatesTags: ['Category']
    }),

  })
});

export const { 
  useCategoriesQuery, 
  useCategoryDetailsQuery,
  useCategoriesSearchQuery,
  useCategoriesRootsQuery,
  useCategoryChildrenQuery,

  useCreateCategoryMutation,

  useLazyCategoryChildrenQuery,
} = categoriesApi;

export const {
  useLazyQuerySubscription
} = categoriesApi.endpoints.categoryChildren
