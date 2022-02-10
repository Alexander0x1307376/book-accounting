import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { CategoryInput, CategoryListResponse, CategoryRecord } from '../../types';
import { insertCategories } from '../categoriesSlice';
import { baseQueryWithReauth } from '../utils/reauthBaseQuery';



type CategoryDetailsParams = {
  uuid: string;
  withParent: boolean;
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Category'],
  endpoints: build => ({

    // query < response , request >
    categories: build.query<CategoryListResponse, number>({
      query: (page: number) => `categories/${page}`,
      providesTags: ['Category']
    }),

    // query < response , request >
    categoryDetails: build.query<CategoryRecord, CategoryDetailsParams>({
      query: ({uuid, withParent}) => ({
        url: `category/${uuid}`,
        method: 'GET',
        params: { withParent }
      }),
      providesTags: ['Category']
    }),

    // query < response , request >
    categoriesSearch: build.query<CategoryRecord[], string>({
      query: (search: string) => `categories/search?search=${search}`,
      providesTags: ['Category']
    }),

    // query < response , request >
    categoriesRoots: build.query<CategoryRecord[], void>({
      query: () => `categories/root`,
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(insertCategories({children: data}));
        } catch (e) {
          console.log('ERROR!!!');
        }
      },
      providesTags: ['Category']
    }),

    // query < response , request >
    categoryChildren: build.query<CategoryRecord[], string>({
      query: (uuid: string) => `category/${uuid}/children`,
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(insertCategories({parentId: id, children: data}))
      },
      providesTags: ['Category']
    }),

    // query < response , request >
    createCategory: build.mutation<CategoryRecord, CategoryInput>({
      query: categoryInput => ({
        url: `category/create`,
        method: 'POST',
        body: categoryInput
      }),
      invalidatesTags: ['Category']
    }),

    // query < response , request >
    editCategory: build.mutation<CategoryRecord, {id: string, data: CategoryInput}>({
      query: ({id, data}) => ({
        url: `category/${id}/edit`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Category']
    }),

    // query < response , request >
    deleteCategory: build.mutation<CategoryRecord, string>({
      query: (id) => ({
        url: `category/${id}/delete`,
        method: 'DELETE'
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
  useLazyCategoriesRootsQuery,
  useCategoryChildrenQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useLazyCategoryChildrenQuery,
  useDeleteCategoryMutation
} = categoriesApi;

export const {
  useLazyQuerySubscription
} = categoriesApi.endpoints.categoryChildren
