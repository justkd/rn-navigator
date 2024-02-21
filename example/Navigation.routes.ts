import { type ComponentType } from 'react'
import { getTypedRoutes } from '../src'
import { navigationRouteKeys } from './Navigation.routeKeys'
import { Home } from './routes/Home'
import { One } from './routes/One'
import { OneA } from './routes/One.A'
import { Two } from './routes/Two'
import { TwoA } from './routes/Two.A'
/* ******************** */

const routes = {
  '/Home': Home,

  '/One': One,
  '/One/A': OneA,

  '/Two': Two,
  '/Two/A': TwoA,
} as Record<keyof typeof navigationRouteKeys, ComponentType>

export const { navigationRoutes } = getTypedRoutes(routes)
