import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { AuthorInput, AuthorListResponse, AuthorRecord } from '../../types';
import { baseQueryWithReauth } from '../utils/reauthBaseQuery';

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Author'],
  endpoints: build => ({


    // query < response , request >
    authors: build.query<AuthorListResponse, number>({
      query: (page) => ({
        url: `authors/${page}`,
        method: 'GET'
      }),
      providesTags: ['Author']
    }),

    // query < response , request >
    authorDetails: build.query<AuthorRecord, string>({
      query: (uuid) => ({
        url: `author/${uuid}`,
        method: 'GET'
      }),
      providesTags: ['Author']
    }),

    // query < response , request >
    authorSearch: build.query<AuthorRecord[], string>({
      // query: (search) => `authors/search?search=${search}`,
      query: (search) => ({
        url: `authors/search`,
        method: 'GET',
        params: { search }
      }),
      providesTags: ['Author']
    }),

    // query < response , request >
    createAuthor: build.mutation<any, AuthorInput>({
      query: (authorInput) => ({
        url: `author/create`,
        method: 'POST',
        body: authorInput
      }),
      invalidatesTags: ['Author']
    }),

    // mutation< response, request >
    editAuthor: build.mutation<any, { id: string, data: AuthorInput }>({
      query: ({id, data}) => ({
        url: `author/${id}/edit`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Author']
    }),
    
    // mutation< response, request >
    deleteAuthor: build.mutation<any, string>({
      query: (id) => ({
        url: `author/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Author']
    })
  })
});

export const { 
  useAuthorsQuery, 
  useAuthorDetailsQuery, 
  useCreateAuthorMutation, 
  useEditAuthorMutation,
  useAuthorSearchQuery,
  useDeleteAuthorMutation
} = authorsApi;

