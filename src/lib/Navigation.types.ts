import {
  type ViewStyle,
  type ImageSourcePropType,
  type ImageBackgroundProps,
} from 'react-native'
import { backToken } from './Navigation.back.token'

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

export type NavigationEvent = {
  to: string
  payload?: Record<string, any>
  background?: string
}

export type NavigationState = {
  queue: NavigationEvent[]
  history: NavigationEvent[]
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
