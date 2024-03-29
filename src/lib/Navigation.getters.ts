import { backToken } from './Navigation.tokens'
/* =^..^=  ✿  =^..^=  */
/**
 * Uses the values returned from the other getters and returns
 * a strongly typed object holding all navigation routes.
 */
export const getTypedRoutes = <T extends Record<any, any>>(
  routes: T,
) => {
  const entries = Object.entries(routes)
  const $entries = [...entries, [backToken, () => {}]]
  const $routes = Object.fromEntries($entries) as T
  return { navigationRoutes: $routes }
}

/**
 * Ensures the background key helper is strongly typed.
 */
export const getTypedBackgrounds = <T extends Record<any, any>>(
  backgrounds: T,
) => {
  const navigationBackgroundKeys = Object.fromEntries(
    Object.keys(backgrounds).map((k) => [k, k]),
  ) as Record<keyof T, keyof T>
  return {
    navigationBackgroundKeys,
    navigationBackgrounds: backgrounds,
  }
}

/**
 * Adds the internal back token to the user route keys.
 * The back token won't be included in the exposed type,
 * but the navigate fn will still accept it from the `back`
 * helper returned by `useNavigation`. The route keys will
 * also be strongly typed.
 */
export const getTypedRouteKeys = <T extends readonly string[]>(
  arr: T,
) => {
  const entries = arr.map((k) => [k, k])
  const $entries = [...entries, [backToken, () => {}]]
  const keys = Object.fromEntries($entries)
  const back = Object.fromEntries([
    [backToken, backToken],
  ]) as Record<typeof backToken, typeof backToken>
  const navigationRouteKeys = keys as Record<
    T[number],
    T[number]
  > &
    typeof back
  return { navigationRouteKeys }
}
/* =^..^=  ✿  =^..^=  */
