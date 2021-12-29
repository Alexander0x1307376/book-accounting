import AuthorDetails from '../components/pages/authorDetails';
import Authors from '../components/pages/authors';
import BookDetails from '../components/pages/bookDetails';
import Books from '../components/pages/books';
import Categories from '../components/pages/categories';
import CategoryDetails from '../components/pages/categoryDetails';
import { RouteObject } from "react-router-dom";
import Main from '../components/layouts/main';
import Dashboard from '../components/pages/dashboard';
import Login from '../components/layouts/login';
import AuthorCreate from '../components/pages/authorCreate';
import AuthorEdit from '../components/pages/authorEdit';
import BookCreate from '../components/pages/bookCreate';
import CategoryCreate from '../components/pages/categoryCreate';
import BookEdit from '../components/pages/bookEdit';
import CategoryEdit from '../components/pages/categoryEdit';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        path: '/',
        element: <Dashboard />,
      },
      // Автор
      {
        path: 'authors/:page',
        element: <Authors />,
      },
      {
        path: 'author/create',
        element: <AuthorCreate />,
      },
      {
        path: 'author/:id/edit',
        element: <AuthorEdit />,
      },
      {
        path: 'author/:id',
        element: <AuthorDetails />,
      },
      // Книги
      {
        path: 'books/:page',
        element: <Books />,
      },
      {
        path: 'book/create',
        element: <BookCreate />,
      },
      {
        path: 'book/:id/edit',
        element: <BookEdit />,
      },
      {
        path: 'book/:id',
        element: <BookDetails />,
      },
      // Категории
      {
        path: 'categories/:page',
        element: <Categories />,
      },
      {
        path: 'category/create',
        element: <CategoryCreate />,
      },
      {
        path: 'category/:id/edit',
        element: <CategoryEdit />,
      },
      {
        path: 'category/:id',
        element: <CategoryDetails />,
      },
    ]
  }
];