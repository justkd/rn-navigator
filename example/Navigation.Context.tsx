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

const privateKeys = {
  errorView: '$RN.Navigator.Error.View',
}

const addPrivateRoutes = (
  routes: Record<RouteKey, ComponentType>,
) => {
  const privateEntries = Object.fromEntries([
    [privateKeys.errorView, TempErrorView],
  ])
  return {
    ...routes,
    ...privateEntries,
  } as typeof routes & typeof privateEntries
}

/* ******************************** */

export function useNavigationContextProvider(
  routes: Record<RouteKey, ComponentType>,
  initialRoute: RouteKey,
) {
  const [state, setState] = useState<NavState>({
    current: initialRoute,
    next: null,
  })

  const $routes = useMemo(
    () => addPrivateRoutes(routes),
    [routes],
  )

  const RoutedView = useMemo(() => {
    const key = state.current ?? privateKeys.errorView
    return $routes[key]
  }, [$routes, state])

  const ctx = useMemo(
    () => ({
      state,
      to: (() => {
        const entries = Object.keys(routes).map((k) => [k, k])
        return Object.fromEntries(entries)
      })(),
      navigate: (to: RouteKey) => {
        setState((prev) => ({
          current: to,
          next: null,
        }))
      },
    }),
    [state, routes],
  )

  return {
    NavigationProvider: ({ children }: PropsWithChildren) => {
      console.log('render navigation provider')
      return (
        <NavigationContext.Provider value={ctx}>
          <RoutedView />
          {children}
        </NavigationContext.Provider>
      )
    },
  }
}

export function useNavigationContext() {
  return useContext(NavigationContext) as ContextType
}
