import { useMemo, type MutableRefObject } from 'react'
import { Animated, Easing } from 'react-native'

export const useNavigationAnimations = (
  animTranslate: MutableRefObject<Animated.Value>,
  animOpacity: MutableRefObject<Animated.Value>,
) => {
  const baseDuration = 420
  const translateLTR = useMemo(
    () => ({
      /* ***************** */
      /* ***************** */
      in: Animated.parallel([
        Animated.timing(animTranslate.current, {
          toValue: 1,
          duration: baseDuration,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animOpacity.current, {
          toValue: 1,
          duration: baseDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      /* ***************** */
      /* ***************** */
      out: Animated.parallel([
        Animated.timing(animTranslate.current, {
          toValue: 2,
          duration: baseDuration,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animOpacity.current, {
          toValue: 0,
          duration: baseDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      /* ***************** */
      /* ***************** */
      reset: (cb?: () => void) => {
        animTranslate.current.stopAnimation(() => {
          animTranslate.current.removeAllListeners()
          animOpacity.current.stopAnimation(() => {
            animOpacity.current.removeAllListeners()
            animOpacity.current.setValue(0)
            animTranslate.current.setValue(0)
            cb?.()
          })
        })
      },
      /* ***************** */
      /* ***************** */
    }),
    [animOpacity, animTranslate],
  )
  return { translateLTR }
}
