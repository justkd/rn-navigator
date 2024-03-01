import { type MutableRefObject } from 'react'
import { Animated } from 'react-native'
import { useTranslateLTR } from './animations'

/**
 * Each hook must return an object `{ anims: NavigationAnimations }`
 */
export const navigationAnimations = {
  translateLTR: useTranslateLTR,
} as const

/**
 * Ensure animation type keys are stronlgy typed.
 */
export const NavigationAnimationTypes = Object.fromEntries(
  Object.keys(navigationAnimations).map((k) => [k, k]),
) as Record<
  keyof typeof navigationAnimations,
  keyof typeof navigationAnimations
>

/**
 * Must ultimately return an object `{ anims: NavigationAnimations }`
 */
export const useNavigationAnimations = (
  anim1: MutableRefObject<Animated.Value>,
  anim2: MutableRefObject<Animated.Value>,
  type: keyof typeof NavigationAnimationTypes,
) => navigationAnimations[type](anim1, anim2)
