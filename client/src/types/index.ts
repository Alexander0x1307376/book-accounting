import {Moment} from 'moment';

export type Pagination<T> = {
  list: T[];
  page: number;
  rowsPerPage: number;
  total: number;
}

export type BaseRecord = {
  uuid: string;
  createdAt?: string;
  updatedAt?: string;
}


// #region пользователи

export type UserRecord = {
  name: string;
  email: string;
} & BaseRecord;

export type UserListResponse = Pagination<UserRecord>


export interface UserInput {
  name: string;
  email: string;
  password?: string;
}

// #endregion


// #region автор

// ответ сервера - запись автора
export type AuthorRecord = {
  name: string;
  birthDate?: string;
  deathDate?: string;
  description?: string;
} & BaseRecord;

// ответ сервера - записи автора с пагинацией
export type AuthorListResponse = Pagination<AuthorRecord>

// данные ввода при создании записи
export interface AuthorInput {
  name: string;
  birthDate?: string | Moment;
  deathDate?: string | Moment;
  description?: string;
}

// #endregion


// #region книги

export type BookRecord = {
  name: string;
  isbn: string;
  description?: string;
  authors?: Pick<AuthorRecord, "uuid" | "name">[];
  category?: Pick<CategoryRecord, "uuid" | "name">;
} & BaseRecord;

export type BookListResponse = Pagination<BookRecord>

// ввод, что отправляется на сервер
export interface BookInput {
  name: string;
  isbn: string;
  description?: string;
  categoryId?: string;
  authorsIds?: string[];
}

// данные ввода для автозаполнения форм
export interface FullBookInput {
  name: string;
  isbn: string;
  description?: string;
  category?: {
    uuid: string;
    name: string;
  };
  authors?: {
    uuid: string;
    name: string;
  }[];
}

// #endregion


// #region категории

// запись категории
export type CategoryRecord = {
  name: string;
  description?: string;
  parent?: CategoryRecord;
  childCount?: number;
} & BaseRecord

// то, что отправляется на сервер
export interface CategoryInput {
  name: string;
  description?: string;
  parentId?: string
}

// для автозаполнения форм
export interface FullCategoryInput {
  name: string;
  description?: string;
  parent?: {
    uuid: string;
    name: string;
  }
}

export type CategoryListResponse = Pagination<CategoryRecord>

// #endregion


// #region общие типы

export type LabelKey = {
  key: string; //идентификатор
  label: string; //значение в поле поиска
}

export type SelectionItem = {
  label: string; // представление
  value: string; // идентификатор
}

export type TreeView = {
  title: string,
  key: string,
  isLeaf?: boolean,
  children?: TreeView[]
}

// #endregion


// #region Аутентификация

export interface LoginRequest {
  login: string,
  password: string,
  rememberMe: boolean
}

export interface LoginResponse {
  accessToken: string,
  refreshToken: string,
  userData: {
    uuid: string,
    name: string
  }
}

export interface User {
  uuid: string,
  name: string
}

// #endregion