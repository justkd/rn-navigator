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
  StyleSheet,
  useWindowDimensions,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native'
import {
  NavigationAnimationTypes,
  useNavigationAnimations as useNavAnims,
} from '../Navigation.animations'
import { useNavigationHooks } from '../Navigation.hooks'
import { useNavigationContext } from '../Navigation.context'
import { navigationReducer } from '../Navigation.reducer'
import { backToken } from '../Navigation.tokens'
import { BaseBackground } from './BaseBackground'
import { Backgrounds } from './Backgrounds'
import { AnimatedContainer } from './AnimatedContainer'
import { type NavigationContextType } from '../Navigation.types'

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
})

export function getNavigationController<
  RouteGeneric,
  BackgroundGeneric = any,
>() {
  /* =^..^=  ✿  =^..^=  */
  type Routes = Record<keyof RouteGeneric, ComponentType>
  type UserRouteKey = keyof Omit<RouteGeneric, typeof backToken>
  type NCT = NavigationContextType<
    keyof RouteGeneric,
    keyof BackgroundGeneric
  >
  const NavigationContext = createContext<NCT>(null as any)
  /* =^..^=  ✿  =^..^=  */
  return {
    /**
     * Hook generated in your own navigation file after setting up
     * `@justkd/rn-navigator`. Returns an object `NavigationContextType`
     * with navigation and utility functions and helpers.
     * @example
     * import { useNavigation } from 'your_project_path_to/Your_Navigation.ts'
     * const { navigate, to, bg, back, navigator } = useNavigation()
     */
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
        backgroundColor,
        backgroundImage,
        backgrounds,
        topLevelController = true,
      } = props
      /* =^..^=  ✿  =^..^=  */
      const animT = useRef(new Animated.Value(0))
      const animO = useRef(new Animated.Value(0))
      const anim = NavigationAnimationTypes.translateLTR
      const { anims, baseDur } = useNavAnims(animT, animO, anim)
      const { width, height } = useWindowDimensions()
      /* =^..^=  ✿  =^..^=  */
      const backgroundImageStyle: ViewStyle = useMemo(
        () => ({
          ...styles.background,
          width,
          height,
        }),
        [width, height],
      )
      /* =^..^=  ✿  =^..^=  */
      const [state, dispatch] = useReducer(navigationReducer, {
        queue: [],
        history: [],
        isNavigating: null,
        background: undefined,
      })
      /* =^..^=  ✿  =^..^=  */
      const { ctx } = useNavigationContext<
        Record<keyof RouteGeneric, ComponentType>,
        BackgroundGeneric
      >(
        state,
        dispatch,
        routes as Routes,
        String(initialRoute),
        baseDur,
        backgrounds,
      )
      /* =^..^=  ✿  =^..^=  */
      useNavigationHooks(
        state,
        dispatch,
        String(initialRoute),
        anims,
        { topLevelController },
      )
      /* =^..^=  ✿  =^..^=  */
      return (
        <NavigationContext.Provider value={ctx}>
          <BaseBackground
            backgroundImageStyle={backgroundImageStyle}
            backgroundImage={backgroundImage}
            backgroundColor={backgroundColor}
          />
          <Backgrounds
            backgroundImageStyle={backgroundImageStyle}
            backgrounds={backgrounds}
            state={state}
          />
          <AnimatedContainer
            routes={routes}
            state={state}
            animO={animO.current}
            animT={animT.current}
          />
        </NavigationContext.Provider>
      )
    },
  }
}
