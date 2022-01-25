import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { UserInput, UserListResponse, UserRecord } from '../../types';
import { baseQueryWithReauth } from '../utils/reauthBaseQuery';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: build => ({


    // query < response , request >
    users: build.query<UserListResponse, number>({
      query: (page) => ({
        url: `users/${page}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    // query < response , request >
    userDetails: build.query<UserRecord, string>({
      query: (uuid) => ({
        url: `user/${uuid}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    // query < response , request >
    userSearch: build.query<UserRecord[], string>({
      query: (search) => ({
        url: `users/search`,
        method: 'GET',
        params: { search }
      }),
      providesTags: ['User']
    }),

    // query < response , request >
    createUser: build.mutation<any, UserInput>({
      query: (userInput) => ({
        url: `user/create`,
        method: 'POST',
        body: userInput
      }),
      invalidatesTags: ['User']
    }),

    // mutation< response, request >
    editUser: build.mutation<any, { id: string, data: UserInput }>({
      query: ({id, data}) => ({
        url: `user/${id}/edit`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    
    // mutation< response, request >
    deleteUser: build.mutation<any, string>({
      query: (id) => ({
        url: `user/${id}/delete`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    })
  })
});

export const { 
  useUsersQuery, 
  useUserDetailsQuery, 
  useCreateUserMutation, 
  useEditUserMutation,
  useUserSearchQuery,
  useDeleteUserMutation
} = usersApi;

