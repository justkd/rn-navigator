import type {
  ImageSourcePropType,
  ImageBackgroundProps,
  ViewStyle,
} from 'react-native'
import { RouteKey } from './Navigation.routes'

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

export type NavigationContextType = {
  navigate: (
    to: RouteKey,
    opts?: {
      payload?: Record<string, any>
      background?: string
    },
  ) => void
  to: Record<RouteKey, RouteKey>
  get: () => NavigationState
}
