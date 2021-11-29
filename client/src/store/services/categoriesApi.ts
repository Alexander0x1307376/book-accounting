import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { CategoryListResponse, CategoryRecord } from '../../types';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Category'],
  endpoints: build => ({

    categories: build.query<CategoryListResponse, any>({
      query: (page: number) => ({
        url: `categories/${page}`,
        method: 'GET'
      })
    }),

    categoryDetails: build.query<CategoryRecord, any>({
      query: (lobbyUuid: string) => ({
        url: `category/${lobbyUuid}`,
        method: 'GET'
      })
    })
  })
});

export const { useCategoriesQuery, useCategoryDetailsQuery } = categoriesApi;

