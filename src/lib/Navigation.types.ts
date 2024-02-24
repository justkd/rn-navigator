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
 * All animation types must be accounted for when adding
 * a new animation style (eg. `translateLTR`).
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
  event?: string | NavigationEvent
}

export type NavigationEvent = {
  to: string
  payload?: Record<string, any>
  background?: string
}

export type NavigationState = {
  queue: NavigationEvent[]
  history: NavigationEvent[]
  isNavigating:
    | null
    | typeof navDirTokens.fwd
    | typeof navDirTokens.back
  background?: string
}

export type NavigationContextType<
  R extends string | number | symbol,
  B extends string | number | symbol,
> = {
  navigate: <T extends Record<string, any>>(
    to: R,
    opts?: {
      payload?: T
      background?: string
    },
  ) => void
  to: Record<R, R>
  bg: Record<B, B>
  back: typeof backToken
  peek: () => NavigationState
  get: {
    payload: <T extends Record<string, any>>(
      n?: number,
    ) => T | null
  }
}
