import {
  type PropsWithChildren,
  type ComponentType,
  createContext,
  useState,
  useCallback,
} from 'react'

import {
  type RouteKey,
  Routes,
} from './Navigation.Routes'

type NavAction = {
  type: string
  to: RouteKey
}

type NavState = {
  current: RouteKey | null
  next: RouteKey | null
}

type ContextType = {
  state: NavState,
  navigate: (to: RouteKey) => void
} | null

/* ******************************** */

const defaultCtx: ContextType = {
  state: {
    current: null,
    next: null,
  },
  navigate: (to: RouteKey) => void
}

const NavigationContext = createContext<ContextType>(defaultCtx)

// export function useNavigationContext() {
//   return useContext(NavigationContext)
// }

/* ******************************** */

export function useNavigationContextProvider(
  routes: Record<RouteKey, ComponentType>,
  initialRoute: RouteKey,
) {
  const [navState, setNavState] = useState<NavState>({
    current: initialRoute,
    next: null,
  })
  const navigate = useCallback((state: NavState) => {
    setNavState(state)
  }, [])

  const RoutedView = useMemo(() => routes[navState.current], [routes, navState])

  const NavigationProvider = useCallback(
    ({ children }: PropsWithChildren) => (
      <NavigationContext.Provider
        value={{
          state: navState,
          navigate
        }}
      >
        {children}
      </NavigationContext.Provider>
    ),
    [navState],
  )
  return {
    NavigationProvider,
  }
}
