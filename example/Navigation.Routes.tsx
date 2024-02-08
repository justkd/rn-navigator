import { getTypedRoutes } from './getTypedRoutes'
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
}

export type RouteKey = keyof typeof routes
export type RoutesKeys = Record<RouteKey, RouteKey>
export const Routes = getTypedRoutes<RouteKey>(routes)
