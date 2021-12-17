export interface User {
  uuid?: string,
  name: string,
  email: string,
  password: string,
}

export interface Author {
  uuid?: string,
  name: string,
  birthDate: Date,
  deathDate: Date,
  description: string,
  imageUrl: string,
}

export interface Book {
  uuid?: string,
  isbn: string,
  name: string,
  description: string,
  imageUrl: string
}

export interface Category {
  uuid?: string,
  name: string,
  description: string,
}

export interface CategoryPostData {
  name: string,
  parentId?: string,
  description: string,
}


export interface BookPostData {
  isbn: string,
  name: string,
  description: string,
  categoryId?: string,
  authorsId?: string[],
  imageUrl?: string
}

export interface AuthorPostData {
  name: string,
  birthDate: string,
  deathDate: string,
  description: string,
  imageUrl: string,
}