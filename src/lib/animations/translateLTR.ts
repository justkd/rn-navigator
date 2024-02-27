import { useMemo, type MutableRefObject } from 'react'
import { Animated, Easing, EasingFunction } from 'react-native'
import { type NavigationAnimations } from '../Navigation.types'

/**
 * Animation collection for a given navigation transition style.
 * All of these should be in hook format that returns an object
 * `{ anims: NavigationAnimations, baseDur: number }`. `baseDur`
 * is the duration of a single transition animation (half of a
 * transition).
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
    easing: Easing.inOut(easing),
    useNativeDriver: true,
  })

  const translateLTR: NavigationAnimations = useMemo(() => {
    const T = animTranslate.current
    const O = animOpacity.current
    const { exp, ease, bounce } = Easing
    const { timing, parallel, sequence } = Animated
    return {
      /* =^..^=  ✿  =^..^=  */
      backIn: () => {
        animTranslate.current.setValue(2)
        return parallel([
          timing(T, animate(1, exp)),
          timing(O, animate(1, ease)),
        ])
      },
      /* =^..^=  ✿  =^..^=  */
      backOut: parallel([
        timing(T, animate(-1, exp)),
        timing(O, animate(0, ease)),
      ]),
      /* =^..^=  ✿  =^..^=  */
      in: parallel([
        timing(T, animate(1, exp)),
        timing(O, animate(1, ease)),
      ]),
      /* =^..^=  ✿  =^..^=  */
      out: parallel([
        timing(T, animate(2, exp)),
        timing(O, animate(0, ease)),
      ]),
      /* =^..^=  ✿  =^..^=  */
      error: () => {
        const base = 1
        const delta = (n: number) => n * (base + 0.04)
        const scale = (n: number) =>
          n + 1 < 0
            ? base - Math.log10(Math.abs(n - 1))
            : base + Math.log10(n + 1)
        const stage = (to: number) =>
          timing(T, {
            toValue: to,
            duration: baseDur / 9,
            easing: bounce,
            useNativeDriver: true,
          })
        T.setValue(1)
        return sequence([
          stage(scale(delta(0.05))),
          stage(scale(delta(-0.05))),
          stage(scale(delta(0.025))),
          stage(scale(delta(-0.025))),
          stage(scale(delta(0.0125))),
          stage(scale(delta(-0.0125))),
          stage(scale(delta(0.001))),
          stage(scale(delta(-0.001))),
          stage(base),
        ])
      },
      /* =^..^=  ✿  =^..^=  */
      reset: (cb?: () => void) => {
        T.stopAnimation(() => {
          T.removeAllListeners()
          O.stopAnimation(() => {
            O.removeAllListeners()
            O.setValue(0)
            T.setValue(0)
            cb?.()
          })
        })
      },
      /* =^..^=  ✿  =^..^=  */
    }
  }, [animOpacity, animTranslate])
  return { anims: translateLTR, baseDur }
}
