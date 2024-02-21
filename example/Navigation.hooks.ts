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
    // animate navigation
    if (!(state.queue.length > 1)) return
    animations.out.start(() => {
      animations.reset(() => {
        dispatch({ type: 'shift' })
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
