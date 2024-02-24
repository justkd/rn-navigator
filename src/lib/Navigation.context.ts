import { useCallback, useMemo, type Dispatch } from 'react'
import {
  type NavigationState,
  type NavigationEvent,
} from './Navigation.types'
import { backToken } from './Navigation.back.token'

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

  const peek = useCallback(() => {
    const peeked = { ...state }
    Object.freeze(peeked)
    Object.seal(peeked)
    return peeked
  }, [state])

  const back = useMemo(() => backToken, [])

  const payload = useCallback(
    <T>(n?: number) => {
      const $payload = !n
        ? state.queue[0]
        : [...state.history].reverse()[n - 1]
      const load = $payload?.payload || null
      return load ? (load as T) : null
    },
    [state.history, state.queue],
  )

  const ctx = useMemo(
    () => ({
      navigate,
      peek,
      to,
      bg,
      back,
      get: {
        payload,
      },
    }),
    [navigate, peek, to, bg, back, payload],
  )

  return { ctx }
}
