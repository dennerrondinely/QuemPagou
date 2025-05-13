import { Outlet } from '@tanstack/react-router'
import { Navigation } from './Navigation'

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
} 