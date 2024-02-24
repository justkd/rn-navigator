import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useRef,
  type ComponentType,
} from 'react'
import {
  View,
  Animated,
  ImageBackground,
  useWindowDimensions,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native'
import { useNavigationAnimations } from './Navigation.animations'
import { useNavigationHooks } from './Navigation.hooks'
import { useNavigationContext } from './Navigation.context'
import { navigationReducer } from './Navigation.reducer'
import { backToken } from './Navigation.tokens'
import { NavigationErrorView } from './Navigation.ErrorView'
import type { NavigationContextType } from './Navigation.types'

export function getNavigationController<
  RouteGeneric,
  BackgroundGeneric,
>() {
  /* =^..^=  ✿  =^..^=  */
  type UserRouteKey = keyof Omit<RouteGeneric, typeof backToken>
  type NCT = NavigationContextType<
    keyof RouteGeneric,
    keyof BackgroundGeneric
  >
  const NavigationContext = createContext<NCT>(null as any)
  /* =^..^=  ✿  =^..^=  */
  return {
    /* =^..^=  ✿  =^..^=  */
    useNavigation() {
      const ctx = NavigationContext
      return useContext(ctx)
    },
    /* =^..^=  ✿  =^..^=  */
    NavigationController(props: {
      routes: Record<UserRouteKey, ComponentType>
      initialRoute: UserRouteKey
      backgroundColor?: ViewStyle['backgroundColor']
      backgroundImage?: ImageSourcePropType
      backgrounds?: BackgroundGeneric
      topLevelController?: boolean
    }) {
      const {
        routes,
        initialRoute,
        backgroundColor: bgColor,
        backgroundImage,
        backgrounds,
        topLevelController = true,
      } = props
      /* =^..^=  ✿  =^..^=  */
      const animT = useRef(new Animated.Value(0))
      const animO = useRef(new Animated.Value(0))
      const anims = useNavigationAnimations(animT, animO)
      /* =^..^=  ✿  =^..^=  */
      const { width, height } = useWindowDimensions()
      const backgroundImageStyle: ViewStyle = useMemo(
        () => ({
          position: 'absolute',
          flex: 1,
          justifyContent: 'center',
          width,
          height,
        }),
        [width, height],
      )
      /* =^..^=  ✿  =^..^=  */
      const reducer = navigationReducer
      const [state, dispatch] = useReducer(reducer, {
        queue: [],
        history: [],
        isNavigating: null,
        background: undefined,
      })
      /* =^..^=  ✿  =^..^=  */
      const $routes = routes as Record<
        keyof RouteGeneric,
        ComponentType
      >
      /* =^..^=  ✿  =^..^=  */
      const { ctx } = useNavigationContext<
        Record<keyof RouteGeneric, ComponentType>,
        BackgroundGeneric
      >(state, dispatch, $routes, backgrounds)
      /* =^..^=  ✿  =^..^=  */
      const CurrentView = useMemo(() => {
        const key = state.queue[0]?.to
        const Current =
          (routes as any)[key] || NavigationErrorView
        return Current ? <Current /> : null
      }, [routes, state])
      /* =^..^=  ✿  =^..^=  */
      useNavigationHooks(
        state,
        dispatch,
        String(initialRoute),
        anims.translateLTR,
        {
          topLevelController,
        },
      )
      /* =^..^=  ✿  =^..^=  */
      return (
        <NavigationContext.Provider value={ctx}>
          <ImageBackground
            style={[
              backgroundImageStyle,
              { backgroundColor: bgColor || 'rgba(0,0,0,0)' },
            ]}
            resizeMode="cover"
            source={backgroundImage ?? {}}
          />
          <View
            pointerEvents="none"
            style={[
              backgroundImageStyle,
              {
                opacity:
                  state.isNavigating === 'back' &&
                  !state.history.length
                    ? 1
                    : 0,
              },
            ]}
          >
            {Object.entries(backgrounds || {}).map(
              ([k, v]: any) => {
                const { color, image } = v
                const { style, resizeMode, source } = image || {}
                const { opacity, ...style$ } = style || {}
                return (
                  <ImageBackground
                    key={k}
                    style={[
                      backgroundImageStyle,
                      {
                        backgroundColor:
                          color || 'rgba(0,0,0,0)',
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
          </View>
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
