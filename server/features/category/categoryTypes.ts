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
