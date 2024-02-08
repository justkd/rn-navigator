import type { ComponentType } from 'react'
import { Home } from './routes/Home'
import { One } from './routes/One'
import { OneA } from './routes/One.A'
import { Two } from './routes/Two'
import { TwoA } from './routes/Two.A'

const getTypedRoutes = <T extends string>(
  routes: Record<T, ComponentType>,
) => {
  type RouteKey = keyof typeof routes
  const Routes: Record<RouteKey, ComponentType> = routes
  return Routes
}

/* ******************** */

const routes = {
  '/Home': Home,

  '/One': One,
  '/One/A': OneA,

  '/Two': Two,
  '/Two/A': TwoA,
}

export const Routes = getTypedRoutes<keyof typeof routes>(routes)
export type RouteKey = keyof typeof routes
export type RoutesKeys = Record<RouteKey, RouteKey>
