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
  /**
   * Navigates to the given route with event options and animated transitions.
   * @example
   * const { navigate, to } = useNavigation()
   * navigate(to['/Home'])
   * @example
   * const { navigate, to, bg } = useNavigation()
   * navigate(to['/Home'], {
   *   payload: {
   *     item: 1,
   *     item: '2'
   *   },
   *   background: bg['imageKey']
   * })
   */
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

  /**
   * Strongly typed record of route keys.
   */
  const to: Record<keyof RouteGeneric, keyof RouteGeneric> =
    useMemo(() => {
      const keys = Object.keys(routes as any)
      const entries = keys.map((k) => [k, k])
      return Object.fromEntries(entries)
    }, [routes])

  /**
   * Strongly typed record of background keys.
   */
  const bg: Record<
    keyof BackgroundGeneric,
    keyof BackgroundGeneric
  > = useMemo(() => {
    const keys = Object.keys(backgrounds as any)
    const entries = keys.map((k) => [k, k])
    return Object.fromEntries(entries)
  }, [backgrounds])

  /**
   * Return a frozen copy of the current state.
   * This is just for looking.
   * @example
   * const { navigator } = useNavigation()
   * console.log( navigator.peek() )
   */
  const peek = useCallback(() => {
    const peeked = { ...state }
    Object.freeze(peeked)
    Object.seal(peeked)
    return peeked
  }, [state])

  /**
   * Return the `payload` of the current `NavigationEvent`. If param is
   * `0 | undefined`, the current routes paylaod is retrieved. Otherwise,
   * the param targets index `(length - 1) - (n - 1)` of the history array.
   * The generic T can be used to declare the expected payload type.
   * @example
   * const { navigator } = useNavigation()
   * console.log( navigator.payload() )
   * console.log( navigator.payload(1) ) // only if there is history to check
   * @example
   * const { navigator } = useNavigation()
   * console.log( navigator.payload<{ data: MyDataType }>() )
   */
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

  /**
   * Navigate back to the provided `initialRoute` and reset
   * navigation state to its initial values.
   * @example
   * const { navigator } = useNavigation()
   * console.log( navigator.clear() )
   */
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

  /**
   * !!! You probably don't want to use this. But it's here just in case. !!!
   * Set the navigation state directly.
   * @example
   * const { navigator } = useNavigation()
   * const nextState: NavigationState = {
   *   queue: [{ to: '/Home' }],
   *   history: []
   * }
   * console.log( navigator.set( nextState )
   */
  const set = useCallback(
    (next: Partial<NavigationState>) => {
      dispatch({
        type: 'set',
        event: next,
      })
    },
    [dispatch],
  )

  /**
   * Return the `to` (current route key) property of the current `NavigationEvent`.
   * If param is `0 | undefined`, the current route is retrieved.
   * Otherwise, the param targets index `(length - 1) - (n - 1)`
   * of the history array.
   * @example
   * const { navigator } = useNavigation()
   * console.log( navigator.route() )
   * console.log( navigator.route(1) ) // only if there is history to check
   */
  const route = useCallback(
    (n?: number) => {
      const $route = !n
        ? state.queue[0]?.to
        : [...state.history].reverse()[n - 1]?.to
      return $route || null
    },
    [state.history, state.queue],
  )

  /**
   * The internally reserved string key used to identify a back navigation event.
   * It's added to the user provided routes automatically and can be accessed and used
   * like other route keys.
   * @example
   * const { navigate, back } = useNavigation()
   * navigate(back)
   * @example
   * const { navigate, back, navigator } = useNavigation()
   * navigate(back, {
   *   payload: {
   *     prevRoute: navigator.peek().queue[0].to
   *
   *   }
   * })
   */
  const back = useMemo(() => backToken, [])

  /**
   * Object holding several navigation utility methods.
   */
  const navigator = useMemo(
    () => ({
      peek,
      clear,
      payload,
      route,
      set,
    }),
    [payload, peek, clear, set, route],
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
