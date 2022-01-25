import AuthorDetails from '../components/pages/authorDetails';
import Authors from '../components/pages/authors';
import BookDetails from '../components/pages/bookDetails';
import Books from '../components/pages/books';
import Categories from '../components/pages/categories';
import CategoryDetails from '../components/pages/categoryDetails';
import { Navigate, RouteObject } from "react-router-dom";
import Main from '../components/layouts/main';
import Dashboard from '../components/pages/dashboard';
import Login from '../components/layouts/login';
import AuthorCreate from '../components/pages/authorCreate';
import AuthorEdit from '../components/pages/authorEdit';
import BookCreate from '../components/pages/bookCreate';
import CategoryCreate from '../components/pages/categoryCreate';
import BookEdit from '../components/pages/bookEdit';
import CategoryEdit from '../components/pages/categoryEdit';
import Users from '../components/pages/users';
import UserDetails from '../components/pages/userDetails';
import UserEdit from '../components/pages/userEdit';
import Empty from '../components/pages/empty';
import AuthRoute from '../components/shared/authRoute';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Navigate to="/login" />,
  },
  {
    path: '/',
    element: <AuthRoute><Main /></AuthRoute>,
    children: [
      {
        index: true,
        path: '/',
        element: <Dashboard />,
      },
      // Автор
      {
        path: 'authors',
        element: <Navigate to="/authors/1" />
      },
      {
        path: 'authors/:page',
        element: <Authors />,
        children: [
          {
            path: '/authors/:page',
            element: <Empty />,
          },
          {
            path: 'create',
            element: <AuthorCreate />,
          },
          {
            path: ':id/edit',
            element: <AuthorEdit />,
          },
          {
            path: ':id',
            element: <AuthorDetails />,
          },
        ]
      },
      
      // Книги
      {
        path: 'books',
        element: <Navigate to="/books/1" />
      },
      {
        path: 'books/:page',
        element: <Books />,
        children: [
          {
            path: '/books/:page',
            element: <Empty />,
          },
          {
            path: 'create',
            element: <BookCreate />,
          },
          {
            path: ':id/edit',
            element: <BookEdit />,
          },
          {
            path: ':id',
            element: <BookDetails />,
          },
        ]
      },
      // Категории
      {
        path: 'categories',
        element: <Navigate to="/categories/1" />
      },
      {
        path: 'categories/:page',
        element: <Categories />,
        children: [
          {
            path: '/categories/:page',
            element: <Empty />,
          },
          {
            path: 'create',
            element: <CategoryCreate />,
          },
          {
            path: ':id/edit',
            element: <CategoryEdit />,
          },
          {
            path: ':id',
            element: <CategoryDetails />,
          },
        ]
      },
      // Пользователи
      {
        path: 'users',
        element: <Navigate to="/users/1" />
      },
      {
        path: 'users/:page',
        element: <Users />,
        children: [
          {
            path: '/users/:page',
            element: <Empty />,
          },
          {
            path: ':id',
            element: <UserDetails />,
          },
          {
            path: ':id/edit',
            element: <UserEdit />
          },
        ]
      },
    ]
  }
];