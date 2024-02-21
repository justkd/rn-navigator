import {
  useCallback,
  useMemo,
  type Dispatch,
  type ComponentType,
} from 'react'
import type {
  NavigationState,
  NavigationEvent,
  NavigationBackground,
} from './Navigation.types'

export const useNavigationContext = <R, B>(
  state: NavigationState,
  dispatch: Dispatch<{
    type: string
    payload?: string | NavigationEvent | undefined
  }>,
  routes: R,
  backgrounds?: B,
) => {
  const navigate = useCallback(
    (
      to: keyof R,
      opts?: {
        payload?: Record<string, any>
        background?: string
      },
    ) => {
      console.log('navigate', to)
      dispatch({
        type: 'navigate',
        payload: {
          to: to as string,
          payload: opts?.payload,
          background: opts?.background,
        },
      })
    },
    [dispatch],
  )

  const to: Record<keyof R, keyof R> = useMemo(() => {
    const keys = Object.keys(routes as any)
    const entries = keys.map((k) => [k, k])
    return Object.fromEntries(entries)
  }, [routes])

  const bg: Record<keyof B, keyof B> = useMemo(() => {
    const keys = Object.keys(backgrounds as any)
    const entries = keys.map((k) => [k, k])
    return Object.fromEntries(entries)
  }, [backgrounds])

  const get = useCallback(() => ({ ...state }), [state])

  const ctx = useMemo(
    () => ({
      navigate,
      get,
      to,
      bg,
    }),
    [navigate, get, to, bg],
  )

  return { ctx }
}
