import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BookListResponse, BookRecord } from '../../types';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Book'],
  endpoints: build => ({

    books: build.query<BookListResponse, any>({
      query: (page: number) => ({
        url: `books/${page}`,
        method: 'GET'
      })
    }),

    bookDetails: build.query<BookRecord, any>({
      query: (lobbyUuid: string) => ({
        url: `book/${lobbyUuid}`,
        method: 'GET'
      })
    })
  })
});

export const { useBooksQuery, useBookDetailsQuery } = booksApi;

