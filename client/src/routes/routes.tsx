import AuthorDetails from '../components/pages/authorDetails';
import Authors from '../components/pages/authors';
import BookDetails from '../components/pages/bookDetails';
import Books from '../components/pages/books';
import Categories from '../components/pages/categories';
import CategoryDetails from '../components/pages/categoryDetails';
import { RouteObject } from "react-router-dom";
import Main from '../components/layouts/main';
import Dashboard from '../components/pages/dashboard';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        path: '/',
        element: <Dashboard />,
      },
      {
        path: 'authors/:page',
        element: <Authors />,
      },
      {
        path: 'author/:id',
        element: <AuthorDetails />,
      },

      {
        path: 'books/:page',
        element: <Books />,
      },
      {
        path: 'book/:id',
        element: <BookDetails />,
      },

      {
        path: 'categories/:page',
        element: <Categories />,
      },
      {
        path: 'category/:id',
        element: <CategoryDetails />,
      },
    ]
  }
];