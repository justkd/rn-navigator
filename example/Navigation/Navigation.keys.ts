import { getTypedRouteKeys, GetTypedRouteKeys } from '../../src'
/* ******************** */
const routeKeys = ['/Home', '/A', '/B', '/C', '/Last'] as const
/* ******************** */
export const { navigationRouteKeys } =
  getTypedRouteKeys<typeof routeKeys>(routeKeys)
/* ******************** */
export type NavigationRouteKey = keyof GetTypedRouteKeys<
  typeof navigationRouteKeys
>
