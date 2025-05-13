import { useState } from 'react'
import { useHappyHourStore } from '../store/happy-hour-store'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/input'
import { formatCurrency } from '../lib/utils'
import { Trash2, UserPlus } from 'lucide-react'

export function People() {
  const { currentHappyHour, addPerson, removePerson, calculatePersonTotal } = useHappyHourStore()
  const [newPersonName, setNewPersonName] = useState('')

  if (!currentHappyHour) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Pessoas</h1>
        <p className="text-muted-foreground">
          Crie um happy hour primeiro para adicionar pessoas.
        </p>
      </div>
    )
  }

  const handleAddPerson = () => {
    if (!newPersonName.trim()) return

    addPerson({
      id: crypto.randomUUID(),
      name: newPersonName.trim(),
      products: []
    })

    setNewPersonName('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-6 flex-col gap-2">
        <h1 className="text-2xl font-bold">Pessoas</h1>
        <div className="flex gap-2 text-muted-foregroun">
          <Input
            placeholder="Nome da pessoa"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
            className="w-48"
          />
          <Button onClick={handleAddPerson} size="icon" className="p-0 flex items-center justify-center">
            <UserPlus className="h-4 w-4"/>
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {currentHappyHour.people.map((person) => (
          <div
            key={person.id}
            className="bg-card rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">
                  {person.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{person.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {person.products.length} produtos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">
                {formatCurrency(calculatePersonTotal(person.id))}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => removePerson(person.id)}
                className="text-destructive hover:text-destructive p-0 flex items-center justify-center"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {currentHappyHour.people.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <UserPlus className="h-8 w-8 mx-auto mb-2" />
            <p>Nenhuma pessoa adicionada ainda.</p>
            <p className="text-sm">Use o campo acima para adicionar pessoas.</p>
          </div>
        )}
      </div>
    </div>
  )
} 