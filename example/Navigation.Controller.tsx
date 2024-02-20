import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useRef,
} from 'react'

import {
  Animated,
  ImageBackground,
  useWindowDimensions,
  type ImageSourcePropType,
} from 'react-native'
import { useNavigationAnimations } from './Navigation.animations'
import { useNavigationContext } from './Navigation.context'
import type { NavigationContextType } from './Navigation.types'
import { navigationReducer } from './Navigation.reducer'
import { useNavigationHooks } from './Navigation.hooks'

/* ************************************ */

const NavigationContext = createContext<NavigationContextType>(
  null as any,
)

export const useNavigation = () => {
  const ctx = NavigationContext
  const { navigate, to, get } = useContext(ctx) || {}
  return { navigate, to, get }
}

/* ************************************ */

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

  const [state, dispatch] = useReducer(navigationReducer, {
    queue: [],
    background: {},
  })

  const CurrentView = useMemo(() => {
    const Current = routes[state.queue[0]?.to]
    return Current ? <Current /> : null
  }, [routes, state])

  const animT = useRef(new Animated.Value(0))
  const animO = useRef(new Animated.Value(0))
  const { width, height } = useWindowDimensions()
  const { ctx } = useNavigationContext(routes, state, dispatch)
  const { animations } = useNavigationAnimations(animT, animO)

  useNavigationHooks(
    state,
    dispatch,
    animations,
    initialRoute,
    animT,
    animO,
  )

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
            opacity: animO.current,
            transform: [
              {
                translateX: animT.current.interpolate({
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
