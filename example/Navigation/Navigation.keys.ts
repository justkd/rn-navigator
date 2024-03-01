import { getTypedRouteKeys, GetTypedRouteKeys } from '../../src'
/* ******************** */
const routeKeys = ['/Home', '/Last'] as const
/* ******************** */
export const { navigationRouteKeys } =
  getTypedRouteKeys<typeof routeKeys>(routeKeys)
/* ******************** */
export type NavigationRouteKey = keyof GetTypedRouteKeys<
  typeof navigationRouteKeys
>
