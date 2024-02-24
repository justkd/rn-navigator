import {
  useEffect,
  type Dispatch,
  type MutableRefObject,
} from 'react'
import { Animated } from 'react-native'
import {
  type NavigationState,
  type NavigationEvent,
} from './Navigation.types'
import { backToken } from './Navigation.tokens'

export const useNavigationHooks = (
  state: NavigationState,
  dispatch: Dispatch<{
    type: string
    event?: string | NavigationEvent | undefined
  }>,
  animations: {
    in: Animated.CompositeAnimation
    out: Animated.CompositeAnimation
    error: Animated.CompositeAnimation
    backIn: () => Animated.CompositeAnimation
    backOut: Animated.CompositeAnimation
    reset: (cb?: (() => void) | undefined) => void
  },
  initialRoute: string,
  animT: MutableRefObject<Animated.Value>,
  animO: MutableRefObject<Animated.Value>,
) => {
  useEffect(() => {
    // init NavigationController
    if (state.queue.length) return
    dispatch({
      type: 'init',
      event: initialRoute,
    })
  }, [initialRoute, state, dispatch])

  useEffect(() => {
    if (!(state.queue.length > 1)) return
    // animate back nav event
    if (state.queue[1].to === backToken) {
      if (!state.history.length) {
        animations.error.start()
        return
      }
      animations.backOut.start(() => {
        animations.reset(() => {
          dispatch({ type: 'go_back' })
          animations.backIn().start()
        })
      })
      return
    }
    // animate forward nav event
    animations.out.start(() => {
      animations.reset(() => {
        dispatch({ type: 'go_forward' })
        animations.in.start()
      })
    })
  }, [state, animations, dispatch])

  useEffect(() => {
    // mount NavigationController
    animations.in.start()
    const anims = [animT.current, animO.current]
    return () => {
      anims.forEach((anim) => {
        anim.stopAnimation(() => {
          anim.removeAllListeners()
        })
      })
    }
    /* eslint-disable-next-line */
  }, [])
}
