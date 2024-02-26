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
  initialRoute: string,
  baseDur: number,
  backgrounds?: BackgroundGeneric,
) => {
  /* =^..^=  ✿  =^..^=  */
  const navigate = useCallback(
    <T extends Record<string, any>>(
      to: keyof RouteGeneric,
      opts?: {
        payload?: T
        background?: string
      },
    ) => {
      const { payload, background } = opts || {}
      dispatch({
        type: 'navigate',
        event: {
          to: to as string,
          payload,
          background,
        },
      })
    },
    [dispatch],
  )
  /* =^..^=  ✿  =^..^=  */
  const to: Record<keyof RouteGeneric, keyof RouteGeneric> =
    useMemo(() => {
      const keys = Object.keys(routes as any)
      const entries = keys.map((k) => [k, k])
      return Object.fromEntries(entries)
    }, [routes])
  /* =^..^=  ✿  =^..^=  */
  const bg: Record<
    keyof BackgroundGeneric,
    keyof BackgroundGeneric
  > = useMemo(() => {
    const keys = Object.keys(backgrounds as any)
    const entries = keys.map((k) => [k, k])
    return Object.fromEntries(entries)
  }, [backgrounds])
  /* =^..^=  ✿  =^..^=  */
  const peek = useCallback(() => {
    const peeked = { ...state }
    Object.freeze(peeked)
    Object.seal(peeked)
    return peeked
  }, [state])
  /* =^..^=  ✿  =^..^=  */
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
  /* =^..^=  ✿  =^..^=  */
  const clear = useCallback(
    (background?: string) => {
      dispatch({
        type: 'navigate',
        event: {
          to: initialRoute as string,
          background,
        },
      })
      setTimeout(() => {
        dispatch({ type: 'clear' })
      }, baseDur * 2)
    },
    [dispatch, initialRoute, baseDur],
  )
  /* =^..^=  ✿  =^..^=  */
  const set = useCallback(
    (next: Partial<NavigationState>) => {
      dispatch({
        type: 'set',
        event: next,
      })
    },
    [dispatch],
  )
  /* =^..^=  ✿  =^..^=  */
  const back = useMemo(() => backToken, [])
  /* =^..^=  ✿  =^..^=  */
  const navigator = useMemo(
    () => ({
      peek,
      clear,
      payload,
      set,
    }),
    [payload, peek, clear, set],
  )
  /* =^..^=  ✿  =^..^=  */
  const ctx = useMemo(
    () => ({
      navigate,
      to,
      bg,
      back,
      navigator,
    }),
    [navigate, to, bg, back, navigator],
  )
  /* =^..^=  ✿  =^..^=  */
  return { ctx }
}
