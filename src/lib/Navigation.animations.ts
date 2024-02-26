import { type MutableRefObject } from 'react'
import { Animated } from 'react-native'
import { useTranslateLTR } from './animations'

export const navigationAnimations = {
  translateLTR: useTranslateLTR,
} as const

export const NavigationAnimationTypes = Object.fromEntries(
  Object.keys(navigationAnimations).map((k) => [k, k]),
) as Record<
  keyof typeof navigationAnimations,
  keyof typeof navigationAnimations
>

/**
 * Must return an object `{ anims: NavigationAnimations }`
 */
export const useNavigationAnimations = (
  anim1: MutableRefObject<Animated.Value>,
  anim2: MutableRefObject<Animated.Value>,
  type: keyof typeof NavigationAnimationTypes,
) => navigationAnimations[type](anim1, anim2)
