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

// автор

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
  birthDate?: string;
  deathDate?: string;
  description: string;
}


// книги

export type BookRecord = {
  name: string;
  description?: string;
  authors?: string[];
  category?: string;
} & BaseRecord;

export type BookListResponse = Pagination<BookRecord>

export interface BookInput {
  name: string;
  isbn: string;
  description?: string;
  categoryId?: string;
  authorsIds?: string[];
}

// категории

// запись категории
export type CategoryRecord = {
  name: string;
  description?: string;
  childCount?: number;
} & BaseRecord

export interface CategoryInput {
  name: string;
  description?: string;
  parentId?: string
}

export type CategoryListResponse = Pagination<CategoryRecord>

