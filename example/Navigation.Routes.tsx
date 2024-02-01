import type { ComponentType } from 'react'
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
export const Routes: Record<RouteKey, ComponentType> = routes
// export const RouteKeys = Object.fromEntries(
//   Object.keys(Routes).map((k) => [k, k]),
// ) as Record<RouteKey, RouteKey>
