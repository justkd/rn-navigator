import {
  type PropsWithChildren,
  type ComponentType,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from 'react'

import { TempErrorView } from './routes/TempErrorView'

import {
  type RouteKey,
  type RoutesKeys,
} from './Navigation.Routes'

/* ******************************** */

type NavState = {
  current: RouteKey | null
  next: RouteKey | null
}

type ContextType = {
  state: NavState
  navigate: (to: RouteKey) => void
  to: RoutesKeys
}

/* ******************************** */

const NavigationContext = createContext<ContextType | null>(null)

/* ******************************** */

export function useNavigationContextProvider(
  routes: Record<RouteKey, ComponentType>,
  initialRoute: RouteKey,
) {
  const errorViewKey = '$RN.Navigator.Error.View'

  const $routes = useMemo(() => {
    const privateEntries = Object.fromEntries([
      [errorViewKey, TempErrorView],
    ])
    return {
      ...routes,
      ...privateEntries,
    } as typeof routes & typeof privateEntries
  }, [routes])

  const [navState, setNavState] = useState<NavState>({
    current: initialRoute,
    next: null,
  })

  const navigate = useCallback((to: RouteKey) => {
    setNavState((prev) => ({
      current: to,
      next: null,
    }))
  }, [])

  const RoutedView = useMemo(() => {
    const key = navState.current ?? errorViewKey
    return $routes[key]
  }, [$routes, navState])

  const to = useMemo(() => {
    const entries = Object.keys(routes).map((k) => [k, k])
    return Object.fromEntries(entries)
  }, [routes])

  const NavigationProvider = useCallback(
    ({ children }: PropsWithChildren) => {
      console.log('render navigation provider')
      return (
        <NavigationContext.Provider
          value={{
            state: navState,
            to,
            navigate,
          }}
        >
          <RoutedView />
          {children}
        </NavigationContext.Provider>
      )
    },
    [navState, RoutedView, navigate, to],
  )

  return {
    NavigationProvider,
  }
}

export function useNavigationContext() {
  return useContext(NavigationContext) as ContextType
}
