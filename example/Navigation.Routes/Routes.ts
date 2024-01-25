import type { ComponentType } from 'react'
import { Home } from '../routes/Home'
import { One } from '../routes/One'
import { OneA } from '../routes/One.A'
import { Two } from '../routes/Two'
import { TwoA } from '../routes/Two.A'

/* ******************** */

const routes = [
  ['/Home', Home],

  ['/One', One],
  ['/One/A', OneA],

  ['/Two', Two],
  ['/Two/A', TwoA],
] as const

/* ******************** */

const mappedRoutes = new Map(routes)
const entries = [...mappedRoutes.entries()]

type NavigationRoute = (typeof entries)[0]
type NavigationPath = NavigationRoute[0]

export const MappedRoutes = new Map<
  NavigationPath,
  ComponentType
>(mappedRoutes)
