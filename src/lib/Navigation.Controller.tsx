import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useRef,
  type ComponentType,
} from 'react'
import {
  Animated,
  ImageBackground,
  useWindowDimensions,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native'
import { navigationReducer } from './Navigation.reducer'
import { useNavigationAnimations } from './Navigation.animations'
import { useNavigationHooks } from './Navigation.hooks'
import { useNavigationContext } from './Navigation.context'
import type {
  NavigationBackground,
  NavigationContextType,
} from './Navigation.types'
import { NavigationErrorView } from './Navigation.ErrorView'

/* ************************************ */

// type NCT = NavigationContextType
// const NavigationContext = createContext<unknown>(null as any)

// export const useNavigation = () => {
//   const ctx = NavigationContext
//   return useContext(ctx)
// }

/* ************************************ */

export function getNavigationController<R, B>() {
  type NCT = NavigationContextType<keyof R, keyof B>
  const NavigationContext = createContext<NCT>(null as any)
  return {
    useNavigation() {
      const ctx = NavigationContext
      return useContext(ctx)
    },

    NavigationController(props: {
      routes: Record<keyof R, ComponentType>
      initialRoute: string
      backgroundColor?: ViewStyle['backgroundColor']
      backgroundImage?: ImageSourcePropType
      backgrounds?: B
    }) {
      const {
        routes,
        initialRoute,
        backgroundColor,
        backgroundImage,
        backgrounds,
      } = props

      const reducer = navigationReducer
      const [state, dispatch] = useReducer(reducer, {
        queue: [],
        background: undefined,
      })

      const CurrentView = useMemo(() => {
        const Current =
          (routes as any)[state.queue[0]?.to] ||
          NavigationErrorView
        return Current ? <Current /> : null
      }, [routes, state])

      const animT = useRef(new Animated.Value(0))
      const animO = useRef(new Animated.Value(0))

      const { width, height } = useWindowDimensions()
      const { ctx } = useNavigationContext<
        Record<keyof R, ComponentType>,
        B
      >(state, dispatch, routes, backgrounds)

      const anims = useNavigationAnimations(animT, animO)

      useNavigationHooks(
        state,
        dispatch,
        anims.translateLTR,
        initialRoute,
        animT,
        animO,
      )

      return (
        <NavigationContext.Provider value={ctx}>
          <ImageBackground
            style={{
              position: 'absolute',
              backgroundColor:
                backgroundColor || 'rgba(0,0,0,0)',
              flex: 1,
              justifyContent: 'center',
              width,
              height,
            }}
            resizeMode="cover"
            source={backgroundImage ?? {}}
          />
          {Object.entries(backgrounds || {}).map(
            ([k, v]: any) => {
              const { color, image } = v
              const { style, resizeMode, source } = image || {}
              /* eslint-disable-next-line  */
              const { opacity, ...style$ } = style || {}
              return (
                <ImageBackground
                  key={k}
                  style={[
                    {
                      position: 'absolute',
                      backgroundColor: color || 'rgba(0,0,0,0)',
                      flex: 1,
                      justifyContent: 'center',
                      width,
                      height,
                      opacity: Number(state?.background === k),
                    },
                    style$,
                  ]}
                  resizeMode={resizeMode || 'cover'}
                  source={source ?? {}}
                />
              )
            },
          )}
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
        </NavigationContext.Provider>
      )
    },
  }
}