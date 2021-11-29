// import {
//   BaseQueryFn,
//   FetchArgs,
//   fetchBaseQuery,
//   FetchBaseQueryError,
// } from '@reduxjs/toolkit/query'
// import { RootState } from '..';
// import { setUser, clearUser, UserState } from '../user/userSlice';

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://localhost:8000/',
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.accessToken;
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`)
//     }
//     return headers
//   },
// });




// // Пока что рефреши работают через заголовки
// export const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   // args - url, method и пр., api - getState, dispatch и пр.

//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     // получаем новый токен
//     // const refreshResult = await baseQuery('/refresh', api, extraOptions);
//     const refreshResult = await baseQuery({
//       url: '/refresh',
//       method: 'GET',
//       headers: {
//         refreshToken: (api.getState() as RootState).auth.refreshToken
//       }
//     }, api, extraOptions);

//     if (refreshResult.data) {
//       // сохраняем данные
//       api.dispatch(setUser(refreshResult.data as UserState));
//       // повторяем изначальный запрос
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(clearUser());
//     }
//   }
//   return result
// }

export default {};