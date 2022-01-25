import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwtDecode from "jwt-decode";
import { LoginRequest, LoginResponse } from "../../types";
import { clearUserData, setUserData } from "../../utils/authUtils";
import { setUser } from "../authSlice";
import { RootState } from "../store";



export const authApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['LoginData'],
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: 'login',
        method: 'POST',
        body
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        setUserData(data);
        dispatch(setUser(data));
      }
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST'
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        clearUserData();
      }
    }),
    refresh: build.query<any, any>({
      query: () => 'refresh'
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authApi;