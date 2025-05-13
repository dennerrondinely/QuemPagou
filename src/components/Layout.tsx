import { Outlet } from '@tanstack/react-router'
import { Navigation } from './Navigation'

export function Layout() {
  return (
    <div className="min-h-screen pb-20">
      <main className="container mx-auto px-3 py-4 sm:px-4 sm:py-8">
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
} 