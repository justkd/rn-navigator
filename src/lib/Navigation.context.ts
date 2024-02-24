import { useCallback, useMemo, type Dispatch } from 'react'
import {
  type NavigationState,
  type DispatchAction,
} from './Navigation.types'
import { backToken } from './Navigation.tokens'

export const useNavigationContext = <
  RouteGeneric,
  BackgroundGeneric,
>(
  state: NavigationState,
  dispatch: Dispatch<DispatchAction>,
  routes: RouteGeneric,
  backgrounds?: BackgroundGeneric,
) => {
  const navigate = useCallback(
    <T extends Record<string, any>>(
      to: keyof RouteGeneric,
      opts?: {
        payload?: T
        background?: string
      },
    ) => {
      dispatch({
        type: 'navigate',
        event: {
          to: to as string,
          payload: opts?.payload,
          background: opts?.background,
        },
      })
    },
    [dispatch],
  )

  const to: Record<keyof RouteGeneric, keyof RouteGeneric> =
    useMemo(() => {
      const keys = Object.keys(routes as any)
      const entries = keys.map((k) => [k, k])
      return Object.fromEntries(entries)
    }, [routes])

  const bg: Record<
    keyof BackgroundGeneric,
    keyof BackgroundGeneric
  > = useMemo(() => {
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
