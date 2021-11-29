import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { AuthorListResponse, AuthorRecord } from '../../types';

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Author'],
  endpoints: build => ({

    authors: build.query<AuthorListResponse, any>({
      query: (page: number) => ({
        url: `authors/${page}`,
        method: 'GET'
      })
    }),

    authorDetails: build.query<AuthorRecord, any>({
      query: (lobbyUuid: string) => ({
        url: `author/${lobbyUuid}`,
        method: 'GET'
      })
    })
  })
});

export const { useAuthorsQuery, useAuthorDetailsQuery } = authorsApi;

