export interface Product {
  id: string
  name: string
  price: number
  category: 'drink' | 'food' | 'other'
  isShared: boolean
  quantity: number
}

export interface Person {
  id: string
  name: string
  avatar?: string
  products: Product[]
}

export interface HappyHour {
  id: string
  name: string
  date: string
  people: Person[]
  products: Product[]
  total: number
  status: 'active' | 'completed'
}

export type Category = 'drink' | 'food' | 'other'

export const CATEGORIES: Record<Category, string> = {
  drink: 'Bebida',
  food: 'Comida',
  other: 'Outro'
} 