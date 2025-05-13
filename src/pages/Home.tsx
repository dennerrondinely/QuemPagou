import { useState } from 'react'
import { useHappyHourStore } from '../store/happy-hour-store'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/input'
import { formatCurrency } from '../lib/utils'
import { Plus } from 'lucide-react'

export function Home() {
  const { currentHappyHour, setCurrentHappyHour, calculatePersonTotal, calculateTotal } = useHappyHourStore()
  const [newHappyHourName, setNewHappyHourName] = useState('')

  const handleCreateHappyHour = () => {
    if (!newHappyHourName.trim()) return

    setCurrentHappyHour({
      id: crypto.randomUUID(),
      name: newHappyHourName.trim(),
      date: new Date().toISOString(),
      people: [],
      products: [],
      total: 0,
      status: 'active'
    })

    setNewHappyHourName('')
  }

  if (!currentHappyHour) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao QuemPagou!</h1>
        <p className="text-muted-foreground mb-4">
          Comece adicionando pessoas e produtos para dividir a conta do happy hour.
        </p>
        <div className="grid gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nome do happy hour"
              value={newHappyHourName}
              onChange={(e) => setNewHappyHourName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateHappyHour()}
            />
            <Button onClick={handleCreateHappyHour}>
              <Plus className="h-4 w-4 mr-2" />
              Criar
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">{currentHappyHour.name}</h1>
        <span className="text-sm text-muted-foreground">
          {new Date(currentHappyHour.date).toLocaleDateString('pt-BR')}
        </span>
      </div>

      <div className="grid gap-6">
        <div className="bg-card rounded-lg p-3 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Resumo</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total de Pessoas:</span>
              <span>{currentHappyHour.people.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total de Produtos:</span>
              <span>{currentHappyHour.products.length}</span>
            </div>
            <div className="flex justify-between font-semibold text-base sm:text-lg">
              <span>Total Geral:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-3 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Valores por Pessoa</h2>
          <div className="space-y-4">
            {currentHappyHour.people.map((person) => (
              <div key={person.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {person.avatar ? (
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-xs sm:text-sm">
                        {person.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="text-sm sm:text-base">{person.name}</span>
                </div>
                <span className="font-medium text-sm sm:text-base">
                  {formatCurrency(calculatePersonTotal(person.id))}
                </span>
              </div>
            ))}

            {currentHappyHour.people.length === 0 && (
              <p className="text-center text-muted-foreground py-2 text-sm sm:text-base">
                Adicione pessoas na aba "Pessoas"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 