import {
  type Animated,
  type ViewStyle,
  type ImageSourcePropType,
  type ImageBackgroundProps,
} from 'react-native'
import { backToken, navDirTokens } from './Navigation.tokens'

export type GetTypedRouteKeys<T> = Omit<T, typeof backToken>

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
  error: NavigationAnimationFunction
  backOut: NavigationAnimation
  backIn: NavigationAnimationFunction
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

export type NavigationContextType<
  R extends string | number | symbol,
  B extends string | number | symbol,
> = {
  navigate: <T extends GenericObj>(
    to: R,
    opts?: {
      payload?: T
      background?: string
    },
  ) => void
  to: Record<R, R>
  bg: Record<B, B>
  back: typeof backToken
  navigator: {
    peek: () => NavigationState
    clear: (background?: string) => void
    payload: <T extends GenericObj>(n?: number) => T | null
    set: (next: Partial<NavigationState>) => void
  }
}
