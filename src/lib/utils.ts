import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function calculateSplit(total: number, people: number): number {
  return total / people
}

export function calculateTotal(items: { price: number; quantity: number }[]): number {
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
} 