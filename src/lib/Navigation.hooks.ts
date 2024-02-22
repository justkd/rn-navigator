import {
  useEffect,
  type Dispatch,
  type MutableRefObject,
} from 'react'
import { Animated } from 'react-native'
import type {
  NavigationState,
  NavigationEvent,
} from './Navigation.types'
import { backToken } from './Navigation.back.token'

export const useNavigationHooks = (
  state: NavigationState,
  dispatch: Dispatch<{
    type: string
    payload?: string | NavigationEvent | undefined
  }>,
  animations: {
    in: Animated.CompositeAnimation
    out: Animated.CompositeAnimation
    reset: (cb?: (() => void) | undefined) => void
  },
  initialRoute: string,
  animT: MutableRefObject<Animated.Value>,
  animO: MutableRefObject<Animated.Value>,
) => {
  useEffect(() => {
    // init NavigationController
    if (state.queue.length) return
    console.log('init NavigationController')
    dispatch({
      type: 'init',
      payload: initialRoute,
    })
  }, [initialRoute, state, dispatch])

  useEffect(() => {
    // animate navigation forward
    if (!(state.queue.length > 1)) return
    // animate back nav event
    if (state.queue[1].to === backToken) {
      /**
       * ON DECK: CHANGE THIS TO BACK ANIMATION
       */
      animations.out.start(() => {
        animations.reset(() => {
          dispatch({ type: 'go_back' })
          animations.in.start()
        })
      })
      return
    }
    animations.out.start(() => {
      animations.reset(() => {
        dispatch({ type: 'go_forward' })
        animations.in.start()
      })
    })
  }, [state, animations, dispatch])

  useEffect(() => {
    console.log('mount NavigationController')
    // mount NavigationController
    animations.in.start()
    const anims = [animT.current, animO.current]
    return () => {
      console.log('dismount NavigationController')
      anims.forEach((anim) => {
        anim.stopAnimation(() => {
          anim.removeAllListeners()
        })
      })
    }
    /* eslint-disable-next-line */
  }, [])
}
