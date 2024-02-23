import { useMemo, type MutableRefObject } from 'react'
import { Animated, Easing } from 'react-native'

export const navAnimBaseDur = 420
export const useNavigationAnimations = (
  animTranslate: MutableRefObject<Animated.Value>,
  animOpacity: MutableRefObject<Animated.Value>,
) => {
  const translateLTR = useMemo(
    () => ({
      backIn: () => {
        animTranslate.current.setValue(2)
        return Animated.parallel([
          Animated.timing(animTranslate.current, {
            toValue: 1,
            duration: navAnimBaseDur,
            easing: Easing.in(Easing.exp),
            useNativeDriver: true,
          }),
          Animated.timing(animOpacity.current, {
            toValue: 1,
            duration: navAnimBaseDur,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      },
      /* ***************** */
      /* ***************** */
      backOut: Animated.parallel([
        Animated.timing(animTranslate.current, {
          toValue: -1,
          duration: navAnimBaseDur,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animOpacity.current, {
          toValue: 0,
          duration: navAnimBaseDur,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      /* ***************** */
      /* ***************** */
      in: Animated.parallel([
        Animated.timing(animTranslate.current, {
          toValue: 1,
          duration: navAnimBaseDur,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animOpacity.current, {
          toValue: 1,
          duration: navAnimBaseDur,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      /* ***************** */
      /* ***************** */
      out: Animated.parallel([
        Animated.timing(animTranslate.current, {
          toValue: 2,
          duration: navAnimBaseDur,
          easing: Easing.in(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animOpacity.current, {
          toValue: 0,
          duration: navAnimBaseDur,
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
