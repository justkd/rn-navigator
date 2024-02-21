import type { ComponentType } from 'react'
import type { NavigationBackground } from './Navigation.types'

export const getTypedRoutes = <T extends string>(
  routes: Record<T, ComponentType>,
) => {
  type RouteKey = keyof typeof routes
  const Routes: Record<RouteKey, ComponentType> = routes
  return Routes
}

export const getTypedNavigationBackgrounds = <T extends {}>(
  backgrounds: Record<string, NavigationBackground>,
) => {
  const navigationBackgrounds = backgrounds as T
  const keys = Object.keys(navigationBackgrounds)
  const entries = keys.map((k) => [k, k])
  const navigationBackgroundKeys = Object.fromEntries(
    entries,
  ) as { [k in keyof T]: keyof T }
  return {
    navigationBackgrounds,
    navigationBackgroundKeys,
  }
}
