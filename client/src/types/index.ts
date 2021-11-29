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

export type AuthorRecord = {
  name: string,
  birthDate: string,
  deathDate: string,
  description?: string
} & BaseRecord;

export type BookRecord = {
  name: string,
  description: string,
  authors: string[],
  category: string
} & BaseRecord;

export type CategoryRecord = {
  name: string,
  description: string
} & BaseRecord


export type AuthorListResponse = Pagination<AuthorRecord>
export type BookListResponse = Pagination<BookRecord>
export type CategoryListResponse = Pagination<CategoryRecord>
