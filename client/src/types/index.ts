export type Pagination<T> = {
  list: T[],
  page: number,
  rowsPerPage: number,
  total: number
}

export type BaseRecord = {
  uuid: string,
  createdAt: string,
  updatedAt: string,
}

// автор

// ответ сервера - запись автора
export type AuthorRecord = {
  name: string,
  birthDate: string,
  deathDate: string,
  description?: string
} & BaseRecord;

// ответ сервера - записи автора с пагинацией
export type AuthorListResponse = Pagination<AuthorRecord>

// данные ввода при создании записи
export interface AuthorInput {
  name: string;
  birthDate: string;
  deathDate: string;
  description: string;
}


// книги

export type BookRecord = {
  name: string,
  description: string,
  authors: string[],
  category: string
} & BaseRecord;

export type BookListResponse = Pagination<BookRecord>

// категории

export type CategoryRecord = {
  name: string,
  description: string
} & BaseRecord

export type CategoryListResponse = Pagination<CategoryRecord>

