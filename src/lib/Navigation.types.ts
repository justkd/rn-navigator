import {
  type Animated,
  type ViewStyle,
  type ImageSourcePropType,
  type ImageBackgroundProps,
} from 'react-native'
import { backToken, navDirTokens } from './Navigation.tokens'

/* =^..^=  ✿  =^..^=  */

type BackToken = typeof backToken

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

/**
 * Describe a background view for a
 */
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

type IsNavigating =
  | null
  | typeof navDirTokens.fwd
  | typeof navDirTokens.back
  | typeof navDirTokens.error

export type NavigationState = {
  queue: NavigationEvent[]
  history: NavigationEvent[]
  isNavigating: IsNavigating
  background?: string
}

type GenericObj = Record<string, any>

type NavigateFn<R> = <T extends GenericObj>(
  to: R,
  opts?: {
    payload?: T
    background?: string
  },
) => void

export type NavigationContextType<
  R extends string | number | symbol,
  B extends string | number | symbol,
> = {
  /**
   * @example
   * const { navigate, to } = useNavigation()
   * navigate( to['/Home'] )
   */
  navigate: NavigateFn<R>

  /**
   * Object exposing typed route keys for navigation.
   * @example
   * const { navigate, to } = useNavigation()
   * navigate( to['/Home'] )
   */
  to: Record<R, R>

  /**
   * Object exposing typed background keys for navigation.
   * @example
   * const { navigate, to, bg } = useNavigation()
   * navigate( to['/Home'], { background: bg.one } )
   */
  bg: Record<B, B>

  /**
   * Use as the navigation route target when
   * navigating back in the history stack.
   * @example
   * const { navigate, back } = useNavigation()
   * navigate( back )
   */
  back: BackToken

  /**
   * Object holding utility methods for the navigator.
   */
  navigator: {
    /**
     * Retrieve a copy of the navigation state.
     */
    peek: () => NavigationState

    /**
     * Reset
     */
    reset: (background?: string) => void
    payload: <T extends GenericObj>(n?: number) => T | null
    route: (n?: number) => string | null
    set: (next: Partial<NavigationState>) => void
  }
}
