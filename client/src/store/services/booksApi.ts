import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BookInput, BookListResponse, BookRecord } from '../../types';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Book'],
  endpoints: build => ({

    books: build.query<BookListResponse, any>({
      query: (page: number) => ({
        url: `books/${page}`,
        method: 'GET'
      }),
      providesTags: ['Book']
    }),

    bookDetails: build.query<BookRecord, any>({
      query: (lobbyUuid: string) => ({
        url: `book/${lobbyUuid}`,
        method: 'GET'
      }),
      providesTags: ['Book']
    }),

    createBook: build.mutation<BookInput, any>({
      query: (bookInput: BookInput) => ({
        url: `book/create`,
        method: 'POST',
        body: bookInput
      }),
      invalidatesTags: ['Book']
    }),
  })
});

export const { useBooksQuery, useBookDetailsQuery, useCreateBookMutation } = booksApi;

