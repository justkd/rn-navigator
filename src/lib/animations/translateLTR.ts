import { useMemo, type MutableRefObject } from 'react'
import { Animated, Easing, EasingFunction } from 'react-native'
import { type NavigationAnimations } from '../Navigation.types'

/**
 * Animation collection for a given navigation transition style.
 * All of these should be in hook format that returns an object
 * `{ anims: NavigationAnimations }`
 * @note
 * Adding other animation types might need some reworking of how
 * anim refs are being passed and handled. I can imagine a transition
 * that adds a scaling effect somehow and may need a third ref.
 */
export const useTranslateLTR = (
  animTranslate: MutableRefObject<Animated.Value>,
  animOpacity: MutableRefObject<Animated.Value>,
) => {
  const baseDur = 420

  const animate = (to: number, easing: EasingFunction) => ({
    toValue: to,
    duration: baseDur,
    easing,
    useNativeDriver: true,
  })

  const translateLTR: NavigationAnimations = useMemo(
    () => ({
      /* =^..^=  ✿  =^..^=  */
      backIn: () => {
        animTranslate.current.setValue(2)
        return Animated.parallel([
          Animated.timing(
            animTranslate.current,
            animate(1, Easing.in(Easing.exp)),
          ),
          Animated.timing(
            animOpacity.current,
            animate(1, Easing.inOut(Easing.ease)),
          ),
        ])
      },
      /* =^..^=  ✿  =^..^=  */
      backOut: Animated.parallel([
        Animated.timing(
          animTranslate.current,
          animate(-1, Easing.in(Easing.exp)),
        ),
        Animated.timing(
          animOpacity.current,
          animate(0, Easing.inOut(Easing.ease)),
        ),
      ]),
      /* =^..^=  ✿  =^..^=  */
      in: Animated.parallel([
        Animated.timing(
          animTranslate.current,
          animate(1, Easing.in(Easing.exp)),
        ),
        Animated.timing(
          animOpacity.current,
          animate(1, Easing.inOut(Easing.ease)),
        ),
      ]),
      /* =^..^=  ✿  =^..^=  */
      out: Animated.parallel([
        Animated.timing(
          animTranslate.current,
          animate(2, Easing.in(Easing.exp)),
        ),
        Animated.timing(
          animOpacity.current,
          animate(0, Easing.inOut(Easing.ease)),
        ),
      ]),
      /* =^..^=  ✿  =^..^=  */
      error: () => {
        const stage = (to: number) =>
          Animated.timing(animTranslate.current, {
            toValue: to,
            duration: baseDur / 10,
            easing: Easing.bounce,
            useNativeDriver: true,
          })
        animTranslate.current.setValue(1)
        const base = 1
        const delta = (n: number) => n * (base + 0.04)
        const lerp = (n: number) =>
          n + 1 < 0
            ? base - Math.log10(Math.abs(n - 1))
            : base + Math.log10(n + 1)
        return Animated.sequence([
          stage(lerp(delta(0.05))),
          stage(lerp(delta(-0.05))),
          stage(lerp(delta(0.025))),
          stage(lerp(delta(-0.025))),
          stage(lerp(delta(0.0125))),
          stage(lerp(delta(-0.0125))),
          stage(lerp(delta(0.001))),
          stage(lerp(delta(-0.001))),
          stage(base),
        ])
      },
      /* =^..^=  ✿  =^..^=  */
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
      /* =^..^=  ✿  =^..^=  */
    }),
    [animOpacity, animTranslate],
  )
  return { anims: translateLTR, baseDur }
}
