import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { AuthorInput, AuthorListResponse, AuthorRecord } from '../../types';

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Author'],
  endpoints: build => ({

    authors: build.query<AuthorListResponse, any>({
      query: (page: number) => ({
        url: `authors/${page}`,
        method: 'GET'
      }),
      providesTags: ['Author']
    }),

    authorDetails: build.query<AuthorRecord, any>({
      query: (lobbyUuid: string) => ({
        url: `author/${lobbyUuid}`,
        method: 'GET'
      }),
      providesTags: ['Author']
    }),

    createAuthor: build.mutation<AuthorInput, any>({
      query: (authorInput: AuthorInput) => ({
        url: `author/create`,
        method: 'POST',
        body: authorInput
      }),
      invalidatesTags: ['Author']
    }),

    editAuthor: build.mutation<{id: string, data: AuthorInput}, any>({
      query: ({id, data}) => ({
        url: `author/${id}/edit`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Author']
    })
  })
});

export const { 
  useAuthorsQuery, 
  useAuthorDetailsQuery, 
  useCreateAuthorMutation, 
  useEditAuthorMutation 
} = authorsApi;

