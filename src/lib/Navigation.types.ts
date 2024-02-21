import type {
  ImageSourcePropType,
  ImageBackgroundProps,
  ViewStyle,
} from 'react-native'

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
  background?: string
}

export type NavigationContextType<
  R extends string | number | symbol,
  B extends string | number | symbol,
> = {
  navigate: (
    to: R,
    opts?: {
      payload?: Record<string, any>
      background?: string
    },
  ) => void
  get: () => NavigationState
  to: Record<R, R>
  bg: Record<B, B>
}
