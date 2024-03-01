import {
  type Animated,
  type ViewStyle,
  type ImageSourcePropType,
  type ImageBackgroundProps,
} from 'react-native'
import { backToken, navDirTokens } from './Navigation.tokens'

/* =^..^=  ✿  =^..^=  */

type BackToken = typeof backToken

type GenericObj = Record<string, any>

type IsNavigating =
  | null
  | typeof navDirTokens.fwd
  | typeof navDirTokens.back
  | typeof navDirTokens.error

type NavigateFn<R> = <T extends GenericObj>(
  to: R,
  opts?: {
    payload?: T
    background?: string
  },
) => void

export type GetTypedRouteKeys<T> = Omit<T, BackToken>

export type NavigationAnimation = Animated.CompositeAnimation

export type NavigationAnimationFunction =
  () => Animated.CompositeAnimation

/**
 * All animation keys must be accounted for when adding
 * a new animation type (eg. `translateLTR`).
 */
export type NavigationAnimations = {
  in: NavigationAnimation
  out: NavigationAnimation
  backIn: NavigationAnimationFunction
  backOut: NavigationAnimation
  error: NavigationAnimationFunction
  reset: (cb?: () => void) => void
}

export type NavigationBackground = {
  color?: ViewStyle['backgroundColor']
  image?: {
    source: ImageSourcePropType
    resizeMode?: ImageBackgroundProps['resizeMode']
    style?: ImageBackgroundProps['style']
  }
}

export type DispatchAction = {
  type: string
  event?:
    | string
    | boolean
    | NavigationEvent
    | Partial<NavigationState>
}

export type NavigationEvent = {
  to: string
  payload?: Record<string, any>
  background?: string
}

export type NavigationState = {
  queue: NavigationEvent[]
  history: NavigationEvent[]
  isNavigating: IsNavigating
  background?: string
}

export type NavigationContextType<
  R extends string | number | symbol,
  B extends string | number | symbol,
> = {
  /**
   * Navigates to the given route with event options and animated transitions.
   * @example
   * const { navigate, to } = useNavigation()
   * navigate(to['/Home'])
   * @example
   * const { navigate, to, bg } = useNavigation()
   * navigate(to['/Home'], {
   *   payload: {
   *     item: 1,
   *     item: '2'
   *   },
   *   background: bg['imageKey']
   * })
   */
  navigate: NavigateFn<R>

  /**
   * Object exposing typed route keys for navigation.
   * @example
   * import { useNavigation } from './Navigation'
   * const { navigate, to } = useNavigation()
   * navigate( to['/Home'] )
   */
  to: Record<R, R>

  /**
   * Object exposing typed background keys for navigation.
   * @example
   * import { useNavigation } from './Navigation'
   * const { navigate, to, bg } = useNavigation()
   * navigate( to['/Home'], { background: bg.one } )
   */
  bg: Record<B, B>

  /**
   * Use as the navigation route target when
   * navigating back in the history stack.
   * @example
   * import { useNavigation } from './Navigation'
   * const { navigate, back } = useNavigation()
   * navigate( back )
   */
  back: BackToken

  /**
   * Object holding utility methods for the navigator.
   */
  navigator: {
    /**
     * Return a frozen copy of the current state.
     * This is just for looking.
     * @example
     * import { useNavigation } from './Navigation'
     * const { navigator } = useNavigation()
     * console.log( navigator.peek() )
     */
    peek: () => NavigationState

    /**
     * Reset the navigator. Animates navigation back to the
     * `initialRoute`. A background can be provided as a param.
     * @example
     * import { useNavigation } from './Navigation'
     * const { navigator, bg } = useNavigation()
     * navigator.reset(bg.reset)
     */
    reset: (background?: string) => void

    /**
     * If no param is provided, retrieve the payload for the current route.
     * If an index is provided, retrieve the relevant payload from the
     * navigation history stack.
     * @example
     * import { useNavigation } from './Navigation'
     * const { navigator } = useNavigation()
     * console.log( navigator.payload() )
     * console.log( navigator.payload(1) ) // only if there is history to check
     */
    payload: <T extends GenericObj>(n?: number) => T | null

    /**
     * If no param is provided, retrieve the name for the current route.
     * If an index is provided, retrieve the relevant route name from the
     * navigation history stack.
     * @example
     * import { useNavigation } from './Navigation'
     * const { navigator } = useNavigation()
     * console.log( navigator.route() )
     * console.log( navigator.route(1) ) // only if there is history to check
     */
    route: (index?: number) => string | null

    /**
     * !!! You probably don't want to use this. But it's here just in case. !!!
     * Set the navigation state directly.
     * @example
     * import { useNavigation, type NavigationState } from '@justkd/rn-navigator'
     * const { navigator } = useNavigation()
     * const nextState: NavigationState = {
     *   queue: [{ to: '/Home' }],
     *   history: []
     * }
     * console.log( navigator.set( nextState )
     */
    set: (next: Partial<NavigationState>) => void
  }
}
