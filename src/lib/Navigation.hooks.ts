import { useEffect, type Dispatch } from 'react'
import {
  type NavigationState,
  type DispatchAction,
  type NavigationAnimations,
} from './Navigation.types'
import { backToken } from './Navigation.tokens'

type LocallyDependentProps = {
  topLevelController: boolean
}

export const useNavigationHooks = (
  state: NavigationState,
  dispatch: Dispatch<DispatchAction>,
  initialRoute: string,
  animations: NavigationAnimations,
  props: LocallyDependentProps,
  onNavigation?: (state: {
    from: string
    to: string
    back: boolean
    background?: string
    payload?: any
  }) => void,
) => {
  /* =^..^=  ✿  =^..^=  */
  useEffect(() => {
    // init NavigationController
    if (state.queue.length) return
    dispatch({
      type: 'init',
      event: initialRoute,
    })
  }, [initialRoute, state, dispatch])
  /* =^..^=  ✿  =^..^=  */
  useEffect(() => {
    // begin nav transition if there is a queue
    if (!(state.queue.length > 1)) return
    // check for back nav event
    if (state.queue[1].to === backToken) {
      // error anim when no history
      if (!state.history.length) {
        animations.error().start()
        dispatch({ type: 'go_back_in_history' })
        return
      }
      // animate back nav event
      animations.backOut.start(() => {
        onNavigation?.({
          to: state.history[0].to,
          from: state.queue[0].to,
          back: true,
          background: state.background ?? undefined,
          payload: state.queue[1].payload ?? undefined,
        })
        animations.reset(() => {
          dispatch({ type: 'go_back_in_history' })
          animations.backIn().start(() => {
            dispatch({ type: 'end_navigation_animation' })
          })
        })
      })
      return
    }
    // animate forward nav event
    animations.out.start(() => {
      onNavigation?.({
        to: state.queue[1].to,
        from: state.queue[0].to,
        back: false,
        background: state.background,
        payload: state.queue[1].payload,
      })
      animations.reset(() => {
        dispatch({ type: 'go_forward_in_history' })
        animations.in.start(() => {
          dispatch({ type: 'end_navigation_animation' })
        })
      })
    })
  }, [state, animations, dispatch, onNavigation])
  /* =^..^=  ✿  =^..^=  */
  useEffect(
    // on dismount NavigationController
    () => () => {
      if (props.topLevelController) return
      const msg =
        'Your broke it.' +
        ' A top level navigation controller was dismounted.' +
        ' It should not dismount.'
      /* eslint-disable-next-line */
      console.log(msg)
    },
    [props.topLevelController],
  )
  /* =^..^=  ✿  =^..^=  */
  useEffect(() => {
    // on mount NavigationController
    animations.in.start()
    return () => {
      if (props.topLevelController) return
      const msg =
        'Your broke it.' +
        ' A top level navigation controller was dismounted.' +
        ' It should not dismount.'
      /* eslint-disable-next-line */
      console.log(msg)
    }
    /* eslint-disable-next-line */
  }, [])
  /* =^..^=  ✿  =^..^=  */
}
