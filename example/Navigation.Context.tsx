import {
  type PropsWithChildren,
  type ComponentType,
  createContext,
  useState,
  useMemo,
  useCallback,
} from 'react'

import { View, Text} from 'react-native'

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

const TempErrorView = () => <View style={{
  justifyContent: 'center',
  alignItems: 'center'
}}><Text>{'Nav route error'}</Text></View>

export function useNavigationContextProvider(
  routes: Record<RouteKey, ComponentType>,
  initialRoute: RouteKey,
) {

  const $routes = {
    ...routes,
    '$RN.Navigator.Error.View': <TempErrorView />
  }

  const [navState, setNavState] = useState<NavState>({
    current: initialRoute,
    next: null,
  })

  const navigate = useCallback((to: RouteKey) => {
    setNavState(prev => {
      return {
        current: to,
        next: null
      }
    })
  }, [])

  const RoutedView = useMemo(() => {
    const key = navState.current ?? '$RN.Navigator.Error.View'
    return $routes[key]
  }, [routes, navState])

  const NavigationProvider = useCallback(
    ({ children }: PropsWithChildren) => (
      <NavigationContext.Provider
        value={{
          state: navState,
          navigate
        }}
      >
        <RoutedView />
      </NavigationContext.Provider>
    ),
    [navState],
  )
  
  return {
    NavigationProvider,
  }
}
