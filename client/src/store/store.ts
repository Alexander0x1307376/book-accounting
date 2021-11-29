import { configureStore } from "@reduxjs/toolkit";
import { authorsApi } from "./services/authorsApi";
import { booksApi } from "./services/booksApi";
import { categoriesApi } from "./services/categoriesApi";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
    [booksApi.reducerPath]: booksApi.reducer,
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