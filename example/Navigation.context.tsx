import { useCallback, useMemo, type Dispatch } from 'react'
import type {
  NavigationBackground,
  NavigationState,
  NavigationEvent,
} from './Navigation.types'

export const useNavigationContext = (
  routes: NavigationState,
  state: NavigationState,
  dispatch: Dispatch<{
    type: string
    payload?: string | NavigationEvent | undefined
  }>,
) => {
  const navigate = useCallback(
    (
      to: string,
      opts?: {
        payload?: Record<string, any>
        background?: {
          color?: NavigationBackground['color']
          image?: NavigationBackground['image']
        }
      },
    ) => {
      console.log('navigate', to)
      dispatch({
        type: 'setBackground',
        payload: { background: opts?.background, to: '' },
      })
      dispatch({ type: 'navigate', payload: { to } })
    },
    [dispatch],
  )

  const to: Record<string, string> = useMemo(() => {
    const entries = Object.entries(routes).map(([k]) => [k, k])
    return Object.fromEntries(entries)
  }, [routes])

  const get = useCallback(() => ({ ...state }), [state])

  const ctx = useMemo(
    () => ({ navigate, to, get }),
    [navigate, to, get],
  )

  return { ctx }
}
