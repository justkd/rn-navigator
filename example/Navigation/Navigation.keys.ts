import { getTypedRouteKeys } from '../../src'
import { backToken } from '../../src/lib/Navigation.back.token'

type GetTypedRouteKeys<T> = Omit<T, typeof backToken>

const routeKeys = ['/Home', '/A', '/B', '/C', '/Last'] as const

export const { navigationRouteKeys } =
  getTypedRouteKeys<typeof routeKeys>(routeKeys)

export type NavigationRouteKey = keyof GetTypedRouteKeys<
  typeof navigationRouteKeys
>
