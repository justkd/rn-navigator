import {
  useCallback,
  useMemo,
  type Dispatch,
  type ComponentType,
} from 'react'
import type {
  NavigationState,
  NavigationEvent,
} from './Navigation.types'

export const useNavigationContext = (
  routes: Record<string, ComponentType>,
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
        background?: string
      },
    ) => {
      console.log('navigate', to)
      dispatch({
        type: 'navigate',
        payload: {
          to,
          payload: opts?.payload,
          background: opts?.background,
        },
      })
    },
    [dispatch],
  )

  const to = useMemo(() => {
    const entries = Object.entries(routes).map(([k]) => [k, k])
    return Object.fromEntries(entries)
  }, [routes])

  const get = useCallback(() => ({ ...state }), [state])

  const ctx = useMemo(
    () => ({
      navigate,
      to,
      get,
    }),
    [navigate, to, get],
  )

  return { ctx }
}
