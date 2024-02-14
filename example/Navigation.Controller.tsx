import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react'

import {
  Animated,
  Easing,
  ImageBackground,
  useWindowDimensions,
  type ImageSourcePropType,
} from 'react-native'

type NavigationState = {
  queue: string[]
  payload: any
}

/* ************************************ */

function navigationReducer(
  state: NavigationState,
  action: { type: string } & Record<string, any>,
) {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        queue: [action.initialRoute],
      }
    }
    case 'navigate': {
      return {
        ...state,
        queue: [...state.queue, action.to],
        payload: action.payload ?? null,
      }
    }
    case 'shift': {
      const queue = [...state.queue]
      queue.shift()
      return {
        ...state,
        queue,
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}

const initialState: NavigationState = {
  queue: [],
  payload: null,
}

/* ************************************ */
const NavigationContext = createContext<any>(null)

export function NavigationController(props: {
  routes: any
  initialRoute: string
  backgroundColor?: string
  backgroundImage?: ImageSourcePropType
}) {
  const {
    routes,
    initialRoute,
    backgroundColor,
    backgroundImage,
  } = props

  const [state, dispatch] = useReducer(
    navigationReducer,
    initialState,
  )

  useEffect(() => {
    if (state.queue.length) return
    console.log('init NavigationController')
    dispatch({
      type: 'init',
      initialRoute,
    })
  }, [initialRoute, state])

  const CurrentView = useMemo(() => {
    const Current = routes[state.queue[0]]
    return Current ? <Current /> : null
  }, [routes, state])

  const navigate = useCallback((to: string) => {
    console.log('navigate', to)
    dispatch({
      type: 'navigate',
      to,
    })
  }, [])

  const to: Record<string, string> = useMemo(() => {
    const entries = Object.entries(routes).map(([k]) => [k, k])
    return Object.fromEntries(entries)
  }, [routes])

  const get = useCallback(() => ({ ...state }), [state])

  const ctx = useMemo(
    () => ({ navigate, to, get }),
    [navigate, to, get],
  )

  const animTranslate = useRef(new Animated.Value(0))
  const animOpacity = useRef(new Animated.Value(0))
  const { width, height } = useWindowDimensions()

  const animations = useMemo(
    () => ({
      /* ***************** */
      /* ***************** */
      in: Animated.parallel([
        Animated.timing(animTranslate.current, {
          toValue: 1,
          duration: 720,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animOpacity.current, {
          toValue: 1,
          duration: 420,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      /* ***************** */
      /* ***************** */
      out: Animated.parallel([
        Animated.timing(animTranslate.current, {
          toValue: 2,
          duration: 420,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animOpacity.current, {
          toValue: 0,
          duration: 420,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      /* ***************** */
      /* ***************** */
      reset: (cb?: () => void) => {
        animTranslate.current.stopAnimation(() => {
          animTranslate.current.removeAllListeners()
          animOpacity.current.stopAnimation(() => {
            animOpacity.current.removeAllListeners()
            animOpacity.current.setValue(0)
            animTranslate.current.setValue(0)
            cb?.()
          })
        })
      },
      /* ***************** */
      /* ***************** */
    }),
    [],
  )

  useEffect(() => {
    console.log('mount NavigationController')
    animations.in.start()
    return () => {
      console.log('dismount NavigationController')
    }
    /* eslint-disable-next-line */
  }, [])

  useEffect(() => {
    if (!(state.queue.length > 1)) return
    animations.out.start(() => {
      animations.reset(() => {
        dispatch({
          type: 'shift',
        })
        animations.in.start()
      })
    })
  }, [state, animations])

  return (
    <NavigationContext.Provider value={ctx}>
      <ImageBackground
        style={{
          backgroundColor: backgroundColor || 'rgba(0,0,0,0)',
          flex: 1,
          justifyContent: 'center',
          width,
          height,
        }}
        resizeMode="cover"
        source={backgroundImage ?? {}}
      >
        <Animated.View
          style={{
            height: '100%',
            width: '100%',
            opacity: animOpacity.current,
            transform: [
              {
                translateX: animTranslate.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width, 0],
                }),
              },
            ],
          }}
        >
          {CurrentView}
        </Animated.View>
      </ImageBackground>
    </NavigationContext.Provider>
  )
}
/* ************************************ */

export const useNavigation = () => {
  const { navigate, to, get } = useContext(NavigationContext)
  return {
    navigate,
    to,
    get,
  }
}
