import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BookInput, BookListResponse, BookRecord } from '../../types';
import { baseQueryWithReauth } from '../utils/reauthBaseQuery';



type BookDetailsParams = { 
  uuid: string; 
  withCategory: boolean; 
  withAuthors: boolean; 
}

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  // baseQuery: baseQueryWithReauth,
  tagTypes: ['Book'],
  endpoints: build => ({

    // query < response , request >
    books: build.query<BookListResponse, number>({
      query: (page: number) => ({
        url: `books/${page}`,
        method: 'GET'
      }),
      providesTags: ['Book']
    }),

    // query < response , request >
    bookDetails: build.query<BookRecord, BookDetailsParams>({
      query: ({uuid, withCategory, withAuthors}) => ({
        url: `book/${uuid}`,
        method: 'GET',
        params: {
          withCategory,
          withAuthors 
        }
      }),
      providesTags: ['Book']
    }),

    // mutation< response , request >
    createBook: build.mutation<any, BookInput>({
      query: (bookInput) => ({
        url: `book/create`,
        method: 'POST',
        body: bookInput
      }),
      invalidatesTags: ['Book']
    }),

    // mutation< response, request >
    editBook: build.mutation<any, { id: string; data: BookInput }>({
      query: ({id, data}) => {
        return {
          url: `book/${id}/edit`,
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Book']
    }),

    // mutation< response, request >
    deleteBook: build.mutation<any, string>({
      query: (id) => ({
        url: `book/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Book']
    })

  })
});

export const { 
  useBooksQuery, 
  useBookDetailsQuery, 
  useCreateBookMutation, 
  useEditBookMutation,
  useDeleteBookMutation 
} = booksApi;

