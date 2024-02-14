import type { ComponentType } from 'react'

export const getTypedRoutes = <T extends string>(
  routes: Record<T, ComponentType>,
) => {
  type RouteKey = keyof typeof routes
  const Routes: Record<RouteKey, ComponentType> = routes
  return Routes
}
