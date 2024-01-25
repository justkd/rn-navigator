import {
  type PropsWithChildren,
  type ComponentType,
  createContext,
  useMemo,
  useCallback,
} from 'react'
import { Navigator } from './Navigation.Navigator'
import { Routes } from '../Navigation.Routes'

const ctx = createContext<ReturnType<typeof Navigator>>(
  null as any,
)
export const NavigationContext = ctx
export const useNavigationContextProvider: <
  T extends
    | Iterable<readonly [unknown, unknown]>
    | null
    | undefined,
>(
  routes: T,
) => ComponentType = (routes) => {
  //   const mappedRoutes = new Map(routes)
  //   const entries = [...mappedRoutes.entries()]

  //   type NavigationRoute = (typeof entries)[0]
  //   type NavigationPath = NavigationRoute[0]

  //   export const MappedRoutes = new Map<
  //     NavigationPath,
  //     ComponentType
  //   >(mappedRoutes)

  const navigator = useMemo(() => Navigator(routes), [routes])
  return useCallback(
    ({ children }: PropsWithChildren) => (
      <NavigationContext.Provider value={navigator}>
        {children}
      </NavigationContext.Provider>
    ),
    [navigator],
  )
}

const NavigationContextProvider = () => {
  const NCP = useNavigationContextProvider(Routes)
  return NCP
}
