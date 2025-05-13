import { useState } from 'react'
import { useHappyHourStore } from '../store/happy-hour-store'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/input'
import { formatCurrency } from '../lib/utils'
import { CATEGORIES, type Category } from '../lib/types'
import { Plus, Trash2, ShoppingCart, Minus } from 'lucide-react'

export function Products() {
  const { currentHappyHour, addProduct, removeProduct, updateProductQuantity, assignProductToPerson } = useHappyHourStore()
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'drink' as Category,
    quantity: 1,
    personId: '' // ID da pessoa selecionada
  })

  if (!currentHappyHour) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <p className="text-muted-foreground">
          Crie um happy hour primeiro para adicionar produtos.
        </p>
      </div>
    )
  }

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price) return

    const product = {
      id: crypto.randomUUID(),
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      category: newProduct.category,
      isShared: !newProduct.personId, // Se tiver pessoa selecionada, não é compartilhado
      quantity: newProduct.quantity
    }

    addProduct(product)

    // Se tiver uma pessoa selecionada, atribui o produto a ela
    if (newProduct.personId) {
      assignProductToPerson(product.id, newProduct.personId)
    }

    setNewProduct({
      name: '',
      price: '',
      category: 'drink',
      quantity: 1,
      personId: ''
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Produtos</h1>
        <div className="grid gap-4 p-3 sm:p-4 bg-card rounded-lg">
          <div className="grid gap-2 sm:flex sm:flex-wrap sm:gap-2">
            <Input
              placeholder="Nome do produto"
              value={newProduct.name}
              onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              className="w-full sm:flex-1 sm:min-w-[200px]"
            />
            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
              <Input
                type="number"
                placeholder="Preço"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                className="w-full sm:w-24"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value as Category }))}
                className="h-9 rounded-md border border-input bg-background px-2 sm:px-3 py-1 text-sm"
              >
                {Object.entries(CATEGORIES).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                min="1"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                className="w-full sm:w-16"
              />
            </div>
          </div>

          <div className="grid gap-2 sm:flex sm:flex-wrap sm:gap-2 sm:items-center">
            <select
              value={newProduct.personId}
              onChange={(e) => setNewProduct(prev => ({ ...prev, personId: e.target.value }))}
              className="h-9 rounded-md border border-input bg-background px-2 sm:px-3 py-1 text-sm w-full sm:flex-1 sm:min-w-[200px]"
            >
              <option value="">Produto compartilhado</option>
              {currentHappyHour.people.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
            <Button onClick={handleAddProduct} className="w-full sm:flex-1 sm:min-w-[200px] p-0 flex items-center justify-center">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Produtos Compartilhados */}
        {currentHappyHour.products.filter(p => p.isShared).length > 0 && (
          <div className="bg-card rounded-lg p-3 sm:p-4">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Produtos Compartilhados</h2>
            <div className="space-y-3 sm:space-y-4">
              {currentHappyHour.products
                .filter(product => product.isShared)
                .map(product => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{product.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {CATEGORIES[product.category]} • {product.quantity}x
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateProductQuantity(product.id, Math.max(1, product.quantity - 1))}
                          className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex items-center justify-center text-muted-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 sm:w-8 text-center text-sm">{product.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                          className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex items-center justify-center text-muted-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm sm:text-base">
                          {formatCurrency(product.price * product.quantity)}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeProduct(product.id)}
                          className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:text-destructive p-0 flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Produtos Individuais por Pessoa */}
        {currentHappyHour.people.map(person => {
          const personProducts = currentHappyHour.products.filter(p => 
            !p.isShared && person.products.some(pp => pp.id === p.id)
          )

          if (personProducts.length === 0) return null

          return (
            <div key={person.id} className="bg-card rounded-lg p-3 sm:p-4">
              <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs sm:text-sm">
                    {person.name.charAt(0)}
                  </span>
                </div>
                {person.name}
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {personProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm sm:text-base">{product.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {CATEGORIES[product.category]} • {product.quantity}x
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateProductQuantity(product.id, Math.max(1, product.quantity - 1))}
                          className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex items-center justify-center text-muted-foreground"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 sm:w-8 text-center text-sm">{product.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateProductQuantity(product.id, product.quantity + 1)}
                          className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex items-center justify-center text-muted-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm sm:text-base">
                          {formatCurrency(product.price * product.quantity)}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeProduct(product.id)}
                          className="h-7 w-7 sm:h-8 sm:w-8 text-destructive hover:text-destructive p-0 flex items-center justify-center"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {currentHappyHour.products.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm sm:text-base">Nenhum produto adicionado ainda.</p>
            <p className="text-xs sm:text-sm">Use o formulário acima para adicionar produtos.</p>
          </div>
        )}
      </div>
    </div>
  )
} 