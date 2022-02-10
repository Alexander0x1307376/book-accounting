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
    element: <Login key="login" />,
  },
  {
    path: '/logout',
    element: <Navigate key="nav_login" to="/login" />,
  },
  {
    path: '/',
    element: (
      <AuthRoute>
        <Main key="main" />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        path: '/',
        element: <Dashboard key="dashboard" />,
      },
      // Автор
      {
        path: 'authors',
        element: <Navigate key="nav_authors" to="/authors/1" />
      },
      {
        path: 'authors/:page',
        element: <Authors key="authors" />,
        children: [
          {
            path: '/authors/:page',
            element: <Empty key="authors_empty" />,
          },
          {
            path: 'create',
            element: <AuthorCreate key="author_create" />,
          },
          {
            path: ':id/edit',
            element: <AuthorEdit key="author_edit" />,
          },
          {
            path: ':id',
            element: <AuthorDetails key="author_details" />,
          },
        ]
      },
      
      // Книги
      {
        path: 'books',
        element: <Navigate key="nav_books"  to="/books/1" />
      },
      {
        path: 'books/:page',
        element: <Books key="books" />,
        children: [
          {
            path: '/books/:page',
            element: <Empty key="books_empty" />,
          },
          {
            path: 'create',
            element: <BookCreate key="book_create" />,
          },
          {
            path: ':id/edit',
            element: <BookEdit key="book_edit" />,
          },
          {
            path: ':id',
            element: <BookDetails key="book_details" />,
          },
        ]
      },
      // Категории
      {
        path: 'categories',
        element: <Navigate to="/categories/1" key="nav_categories" />
      },
      {
        path: 'categories/:page',
        element: <Categories key="categories" />,
        children: [
          {
            path: '/categories/:page',
            element: <Empty key="categories_empty" />,
          },
          {
            path: 'create',
            element: <CategoryCreate key="category_create" />,
          },
          {
            path: ':id/edit',
            element: <CategoryEdit key="category_edit" />,
          },
          {
            path: ':id',
            element: <CategoryDetails key="category_details" />,
          },
        ]
      },
      // Пользователи
      {
        path: 'users',
        element: <Navigate to="/users/1" key="nav_users" />
      },
      {
        path: 'users/:page',
        element: <Users key="users" />,
        children: [
          {
            path: '/users/:page',
            element: <Empty key="users_empty" />,
          },
          {
            path: ':id',
            element: <UserDetails key="user_details" />,
          },
          {
            path: ':id/edit',
            element: <UserEdit key="user_edit" />
          },
        ]
      },
    ]
  }
];