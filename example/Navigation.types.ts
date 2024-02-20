import type {
  ImageSourcePropType,
  ImageBackgroundProps,
} from 'react-native'

export type NavigationBackground = {
  color?: string
  image?: {
    source: ImageSourcePropType
    resizeMode?: ImageBackgroundProps['resizeMode']
    style?: ImageBackgroundProps['style']
  }
}

export type NavigationEvent = {
  to: string
  payload?: Record<string, any>
  background?: NavigationBackground
}

export type NavigationState = {
  queue: NavigationEvent[]
  background: NavigationBackground
}

export type NavigationContextType = {
  navigate: (
    to: string,
    opts?: {
      payload?: Record<string, any>
      background?: {
        color?: NavigationBackground['color']
        image?: NavigationBackground['image']
      }
    },
  ) => void
  to: Record<string, string>
  get: () => NavigationState
}
