import { type ComponentType } from 'react'
import { getTypedRoutes } from '../../src'
import { navigationRouteKeys } from './Navigation.keys'
/* ******************** */
import { Home } from '../routes/Home'
import { One } from '../routes/One'
import { OneA } from '../routes/One.A'
import { Two } from '../routes/Two'
import { TwoA } from '../routes/Two.A'
/* ******************** */

const routes: Record<
  keyof typeof navigationRouteKeys,
  ComponentType
> = {
  '/Home': Home,

  '/One': One,
  '/One/A': OneA,

  '/Two': Two,
  '/Two/A': TwoA,
} as const

export const { navigationRoutes } =
  getTypedRoutes<typeof routes>(routes)
