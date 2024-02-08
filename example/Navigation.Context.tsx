import {
  type PropsWithChildren,
  type ComponentType,
  createContext,
  useState,
  useMemo,
  useCallback,
} from 'react'

import { View, Text } from 'react-native'

import { type RouteKey } from './Navigation.Routes'

type NavState = {
  current: RouteKey | null
  next: RouteKey | null
}

type ContextType = {
  state: NavState
  navigate: (to: RouteKey) => void
} | null

/* ******************************** */

const defaultCtx: ContextType = {
  state: {
    current: null,
    next: null,
  },
  navigate: (to: RouteKey) => to,
}

const NavigationContext = createContext<ContextType>(defaultCtx)

// export function useNavigationContext() {
//   return useContext(NavigationContext)
// }

/* ******************************** */

function TempErrorView() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Nav route error</Text>
    </View>
  )
}

export function useNavigationContextProvider(
  routes: Record<RouteKey, ComponentType>,
  initialRoute: RouteKey,
) {
  const $routes = useMemo(
    () => ({
      ...routes,
      '$RN.Navigator.Error.View': TempErrorView,
    }),
    [routes],
  )

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
    const key = navState.current ?? '$RN.Navigator.Error.View'
    return $routes[key]
  }, [$routes, navState])

  const NavigationProvider = useCallback(
    ({ children }: PropsWithChildren) => (
      <NavigationContext.Provider
        value={{
          state: navState,
          navigate,
        }}
      >
        <RoutedView />
        {children}
      </NavigationContext.Provider>
    ),
    [navState, RoutedView, navigate],
  )

  return {
    NavigationProvider,
  }
}
