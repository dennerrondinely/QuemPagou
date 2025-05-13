import { Link } from '@tanstack/react-router'
import { Home, Users, ShoppingCart, Calculator } from 'lucide-react'
import { cn } from '../../lib/utils'

const navigation = [
  { name: 'Início', href: '/', icon: Home },
  { name: 'Pessoas', href: '/people', icon: Users },
  { name: 'Produtos', href: '/products', icon: ShoppingCart },
  { name: 'Resultado', href: '/result', icon: Calculator },
]

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center py-2 px-3 text-sm font-medium',
                'text-muted-foreground hover:text-foreground'
              )}
              activeProps={{
                className: cn(
                  'flex flex-col items-center py-2 px-3 text-sm font-medium',
                  'text-primary'
                )
              }}
            >
              <item.icon className="h-6 w-6" />
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 