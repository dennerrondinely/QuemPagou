import { RouterProvider, createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { People } from './pages/People'
import { Products } from './pages/Products'
import { Result } from './pages/Result'

const rootRoute = createRootRoute({
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/people',
  component: People,
})

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
})

const resultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/result',
  component: Result,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  peopleRoute,
  productsRoute,
  resultRoute,
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function App() {
  return <RouterProvider router={router} />
}
