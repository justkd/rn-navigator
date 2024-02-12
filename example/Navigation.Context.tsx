import {
  type PropsWithChildren,
  type ComponentType,
  createContext,
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
} from 'react'
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import { TempErrorView } from './routes/TempErrorView'
import type { RouteKey, RoutesKeys } from './Navigation.Routes'

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

export function useNavigationContext() {
  return useContext(NavigationContext) as ContextType
}

/* ******************************** */

const fadeIn = (anim: Animated.Value) => {
  const opts = {
    toValue: 1,
    useNativeDriver: true,
  }
  return {
    start: () => Animated.timing(anim, opts).start(),
    style: {
      opacity: anim,
    },
  }
}

/* ******************************** */

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})

export function useNavigationContextProvider(
  routes: Record<RouteKey, ComponentType>,
  initialRoute: RouteKey,
) {
  const window = useWindowDimensions()

  // const [state, setState] = useState<NavState>({
  //   current: initialRoute,
  //   next: null,
  // })

  const [current, setCurrent] = useState<RouteKey | null>(
    initialRoute,
  )
  const [next, setNext] = useState<RouteKey | null>(null)

  const $routes = useMemo(
    () => addPrivateRoutes(routes),
    [routes],
  )

  const entryAnim = useRef(new Animated.Value(0))
  const transitionAnim = useRef(new Animated.Value(0))

  useEffect(() => {
    console.log('state : current', {
      current,
    })
  }, [current])
  useEffect(() => {
    console.log('state : next', {
      next,
    })
  }, [next])

  const RoutedView = useMemo(() => {
    const currentKey = current ?? privateKeys.errorView
    const nextKey = next ?? privateKeys.errorView
    const CurrentView = $routes[currentKey]
    const NextView = $routes[nextKey]
    const { style: fadeStyle } = fadeIn(entryAnim.current)
    return (
      <View
        style={{
          flexDirection: 'row',
          height: window.height,
          width: window.width * 2,
        }}
      >
        <Animated.View
          style={{
            height: window.height,
            width: window.width,
          }}
        >
          <CurrentView />
        </Animated.View>
        <Animated.View
          style={{
            height: window.height,
            width: window.width,
          }}
        >
          <NextView />
        </Animated.View>
      </View>
    )
  }, [$routes, current, next, window])

  const navigate = useCallback((to: RouteKey) => {
    console.log('navigate', to)
    setNext(to)
  }, [])

  const ctx = useMemo(
    () => ({
      state: {
        current,
        next,
      },
      to: (() => {
        const entries = Object.keys(routes).map((k) => [k, k])
        return Object.fromEntries(entries)
      })(),
      navigate,
    }),
    [current, next, routes, navigate],
  )

  // useEffect(() => {
  //   fadeIn(entryAnim.current).start()
  // }, [])

  return {
    NavigationProvider: ({ children }: PropsWithChildren) => {
      console.log('render Navigation Provider')
      return (
        <NavigationContext.Provider value={ctx}>
          {children}
          {RoutedView}
        </NavigationContext.Provider>
      )
    },
  }
}
