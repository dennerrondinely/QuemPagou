import { create } from 'zustand'
import type { HappyHour, Person, Product } from '../lib/types'
import { calculateTotal } from '../lib/utils'

interface HappyHourState {
  currentHappyHour: HappyHour | null
  setCurrentHappyHour: (happyHour: HappyHour) => void
  addPerson: (person: Person) => void
  removePerson: (personId: string) => void
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  assignProductToPerson: (productId: string, personId: string) => void
  unassignProductFromPerson: (productId: string, personId: string) => void
  toggleProductShared: (productId: string) => void
  updateProductQuantity: (productId: string, quantity: number) => void
  calculatePersonTotal: (personId: string) => number
  calculateTotal: () => number
}

const updateHappyHourTotal = (happyHour: HappyHour): HappyHour => {
  const sharedProducts = happyHour.products.filter(p => p.isShared)
  const individualProducts = happyHour.products.filter(p => !p.isShared)
  
  const sharedTotal = calculateTotal(sharedProducts)
  const individualTotal = calculateTotal(individualProducts)
  
  return {
    ...happyHour,
    total: sharedTotal + individualTotal
  }
}

export const useHappyHourStore = create<HappyHourState>((set, get) => ({
  currentHappyHour: null,

  setCurrentHappyHour: (happyHour) => set({ 
    currentHappyHour: updateHappyHourTotal(happyHour)
  }),

  addPerson: (person) => set((state) => ({
    currentHappyHour: state.currentHappyHour ? 
      updateHappyHourTotal({
        ...state.currentHappyHour,
        people: [...state.currentHappyHour.people, person]
      }) : null
  })),

  removePerson: (personId) => set((state) => ({
    currentHappyHour: state.currentHappyHour ? 
      updateHappyHourTotal({
        ...state.currentHappyHour,
        people: state.currentHappyHour.people.filter(p => p.id !== personId)
      }) : null
  })),

  addProduct: (product) => set((state) => ({
    currentHappyHour: state.currentHappyHour ? 
      updateHappyHourTotal({
        ...state.currentHappyHour,
        products: [...state.currentHappyHour.products, product]
      }) : null
  })),

  removeProduct: (productId) => set((state) => ({
    currentHappyHour: state.currentHappyHour ? 
      updateHappyHourTotal({
        ...state.currentHappyHour,
        products: state.currentHappyHour.products.filter(p => p.id !== productId)
      }) : null
  })),

  assignProductToPerson: (productId, personId) => set((state) => {
    if (!state.currentHappyHour) return state

    const product = state.currentHappyHour.products.find(p => p.id === productId)
    if (!product) return state

    const updatedPeople = state.currentHappyHour.people.map(person => {
      if (person.id === personId) {
        return {
          ...person,
          products: [...person.products, product]
        }
      }
      return person
    })

    return {
      currentHappyHour: updateHappyHourTotal({
        ...state.currentHappyHour,
        people: updatedPeople
      })
    }
  }),

  unassignProductFromPerson: (productId, personId) => set((state) => {
    if (!state.currentHappyHour) return state

    const updatedPeople = state.currentHappyHour.people.map(person => {
      if (person.id === personId) {
        return {
          ...person,
          products: person.products.filter(p => p.id !== productId)
        }
      }
      return person
    })

    return {
      currentHappyHour: updateHappyHourTotal({
        ...state.currentHappyHour,
        people: updatedPeople
      })
    }
  }),

  toggleProductShared: (productId) => set((state) => {
    if (!state.currentHappyHour) return state

    const updatedProducts = state.currentHappyHour.products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          isShared: !product.isShared
        }
      }
      return product
    })

    return {
      currentHappyHour: updateHappyHourTotal({
        ...state.currentHappyHour,
        products: updatedProducts
      })
    }
  }),

  updateProductQuantity: (productId, quantity) => set((state) => {
    if (!state.currentHappyHour) return state

    const updatedProducts = state.currentHappyHour.products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          quantity
        }
      }
      return product
    })

    return {
      currentHappyHour: updateHappyHourTotal({
        ...state.currentHappyHour,
        products: updatedProducts
      })
    }
  }),

  calculatePersonTotal: (personId) => {
    const state = get()
    if (!state.currentHappyHour) return 0

    const person = state.currentHappyHour.people.find(p => p.id === personId)
    if (!person) return 0

    const personalProducts = person.products
    const sharedProducts = state.currentHappyHour.products.filter(p => p.isShared)
    const sharedTotal = calculateTotal(sharedProducts) / state.currentHappyHour.people.length

    return calculateTotal(personalProducts) + sharedTotal
  },

  calculateTotal: () => {
    const state = get()
    if (!state.currentHappyHour) return 0
    return state.currentHappyHour.total
  }
})) 