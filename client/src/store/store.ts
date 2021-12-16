import { configureStore } from "@reduxjs/toolkit";
import { authorsApi } from "./services/authorsApi";
import { booksApi } from "./services/booksApi";
import { categoriesApi } from "./services/categoriesApi";
import { categoriesReducer } from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
    categories: categoriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      categoriesApi.middleware,
      authorsApi.middleware, 
      booksApi.middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;