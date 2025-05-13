import { useHappyHourStore } from '../store/happy-hour-store'
import { Button } from '../components/ui/button'
import { formatCurrency } from '../lib/utils'
import { Share2, Download } from 'lucide-react'

export function Result() {
  const { currentHappyHour, calculatePersonTotal } = useHappyHourStore()

  if (!currentHappyHour) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Resultado</h1>
        <p className="text-muted-foreground">
          Crie um happy hour primeiro para ver o resultado.
        </p>
      </div>
    )
  }

  const handleShare = async () => {
    const text = `QuemPagou - ${currentHappyHour.name}\n\n` +
      currentHappyHour.people.map(person => 
        `${person.name}: ${formatCurrency(calculatePersonTotal(person.id))}`
      ).join('\n') + '\n\n' +
      `Total: ${formatCurrency(currentHappyHour.total)}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `QuemPagou - ${currentHappyHour.name}`,
          text
        })
      } catch (error) {
        console.error('Erro ao compartilhar:', error)
      }
    } else {
      await navigator.clipboard.writeText(text)
      alert('Resultado copiado para a área de transferência!')
    }
  }

  const handleDownload = () => {
    const text = `QuemPagou - ${currentHappyHour.name}\n\n` +
      currentHappyHour.people.map(person => 
        `${person.name}: ${formatCurrency(calculatePersonTotal(person.id))}`
      ).join('\n') + '\n\n' +
      `Total: ${formatCurrency(currentHappyHour.total)}`

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `QuemPagou-${currentHappyHour.name.toLowerCase().replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Resultado</h1>
        <div className="flex gap-2">
          <Button onClick={handleShare} variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <Button onClick={handleDownload} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Baixar
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="bg-card rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Resumo</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total de Pessoas:</span>
              <span>{currentHappyHour.people.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total de Produtos:</span>
              <span>{currentHappyHour.products.length}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Geral:</span>
              <span>{formatCurrency(currentHappyHour.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Valores por Pessoa</h2>
          <div className="space-y-4">
            {currentHappyHour.people.map((person) => (
              <div key={person.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm">
                      {person.name.charAt(0)}
                    </span>
                  </div>
                  <span>{person.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {formatCurrency(calculatePersonTotal(person.id))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {person.products.length} produtos
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Produtos Compartilhados</h2>
          <div className="space-y-2">
            {currentHappyHour.products
              .filter(product => product.isShared)
              .map(product => (
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.quantity}x • {formatCurrency(product.price)} cada
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatCurrency(product.price * product.quantity)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatCurrency((product.price * product.quantity) / currentHappyHour.people.length)} por pessoa
                    </div>
                  </div>
                </div>
              ))}
            {!currentHappyHour.products.some(p => p.isShared) && (
              <p className="text-center text-muted-foreground py-2">
                Nenhum produto compartilhado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 