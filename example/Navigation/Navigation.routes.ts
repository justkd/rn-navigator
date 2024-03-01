import { type ComponentType } from 'react'
import { type NavigationRouteKey } from './Navigation.keys'
import { getTypedRoutes } from '../../src'
/* ******************** */
import { Templates } from '../routes/Templates'
/* ******************** */
const routes: Record<NavigationRouteKey, ComponentType> = {
  '/Home': Templates[0],
  '/Last': Templates[1],
}
/* ******************** */
export const { navigationRoutes } =
  getTypedRoutes<typeof routes>(routes)
