import { type ComponentType } from 'react'
import { getTypedRoutes } from '../../src'
import { type NavigationRouteKey } from './Navigation.keys'
import { Templates } from '../routes/Templates'

/* ******************** */

const routes: Record<NavigationRouteKey, ComponentType> = {
  '/Home': Templates[0],
  '/A': Templates[1],
  '/B': Templates[2],
  '/C': Templates[3],
  '/Last': Templates[4],
} as const

export const { navigationRoutes } =
  getTypedRoutes<typeof routes>(routes)
