export interface Author {
  uuid?: string,
  name: string,
  birthDate: Date,
  deathDate: Date,
  description: string,
  imageUrl: string,
}

export interface AuthorPostData {
  name: string,
  birthDate: string,
  deathDate: string,
  description: string,
  imageUrl: string,
}