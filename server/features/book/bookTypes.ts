export interface Book {
  uuid?: string,
  isbn: string,
  name: string,
  description: string,
  imageUrl: string
}

export interface BookPostData {
  isbn: string,
  name: string,
  description: string,
  categoryId?: string,
  authorsId?: string[],
  imageUrl?: string
}