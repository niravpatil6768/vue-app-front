export interface Item {
  id: number,
  name: string,
  description: string
}

export interface LoginForm {
  email: string,
  password: string
}

export interface ProductData {
  _id: string,
  name: string,
  price: string,
  seller: string,
  description: string
}

export interface ProductForm {
  name: string,
  price: string,
  description: string
}