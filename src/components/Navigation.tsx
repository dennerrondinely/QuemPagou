import { Link, useRouter } from '@tanstack/react-router'
import { Home, Users, ShoppingCart, Calculator } from 'lucide-react'
import { cn } from '../lib/utils'

const routes = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/people', label: 'Pessoas', icon: Users },
  { path: '/products', label: 'Produtos', icon: ShoppingCart },
  { path: '/result', label: 'Resultado', icon: Calculator },
]

export function Navigation() {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center h-16">
          {routes.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-xs font-medium transition-colors',
                currentPath === path
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 