import { getTypedRouteKeys } from '../../src'

const routeKeys = [
  '/Home',

  '/One',
  '/One/A',

  '/Two',
  '/Two/A',
] as const

export const { navigationRouteKeys } =
  getTypedRouteKeys<typeof routeKeys>(routeKeys)

export type NavigationRouteKey = keyof typeof navigationRouteKeys
