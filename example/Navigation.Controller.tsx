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
  useWindowDimensions,
  View,
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
    case 'navigate': {
      console.log('reducer navigate', action)
      return {
        ...state,
        queue: [...state.queue, action.to],
        payload: action.payload ?? null,
      }
    }
    case 'shift': {
      console.log('reducer shift', action)
      return {
        ...state,
        queue: state.queue.shift(),
      }
    }
    case 'init': {
      console.log('reducer init', action)
      return {
        ...state,
        queue: [action.initialRoute],
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
}) {
  const { routes, initialRoute } = props

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
    console.log(state)
    return Current ? <Current /> : null
  }, [routes, state])

  // const NextView = useMemo(() => {
  //   const Next = routes[state.next]
  //   return Next ? <Next /> : null
  // }, [routes, state])

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
  const { width } = useWindowDimensions()

  useEffect(() => {
    console.log('mount NavigationController')
    Animated.parallel([
      Animated.timing(animTranslate.current, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(animOpacity.current, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  useEffect(() => {
    if (!(state.queue.length > 1)) return
    console.log('animate navigation', state)
    Animated.parallel([
      Animated.timing(animTranslate.current, {
        toValue: 2,
        useNativeDriver: true,
      }),
      Animated.timing(animOpacity.current, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {})
  }, [state])

  console.log('render NavigationController')

  return (
    <NavigationContext.Provider value={ctx}>
      <View
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
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
    </NavigationContext.Provider>
  )
  // return (
  //   <View>
  //     <Pressable
  //       onPress={() => {
  //         handleNavigation('/One')
  //       }}
  //     >
  //       <Text>navigate</Text>
  //     </Pressable>
  //     <Pressable
  //       onPress={() => {
  //         getState()
  //       }}
  //     >
  //       <Text>check</Text>
  //     </Pressable>
  //     <Pressable
  //       onPress={() => {
  //         getRoutes()
  //       }}
  //     >
  //       <Text>routes</Text>
  //     </Pressable>
  //   </View>
  // )
}
/* ************************************ */

export const useNavigation = () => {
  const { navigate, to, get } = useContext(NavigationContext)

  console.log('useNavigation')
  return {
    navigate,
    to,
    get,
  }
}
