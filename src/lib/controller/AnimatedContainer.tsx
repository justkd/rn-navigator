import { useMemo, type ComponentType } from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import { NavigationErrorView } from '../error/Navigation.ErrorView'
import { type NavigationState } from '../Navigation.types'

export function AnimatedContainer<
  UserRouteKey extends number | string | symbol
>(props: {
  routes: Record<UserRouteKey, ComponentType>
  state: NavigationState
  animO: Animated.Value
  animT: Animated.Value
}) {
  const { routes, state, animT, animO } = props
  const { width } = useWindowDimensions()
  /* =^..^=  ✿  =^..^=  */
  const CurrentView = useMemo(() => {
    const key = state.queue[0]?.to
    const Current = (routes as any)[key]
    return Current ? <Current /> : <NavigationErrorView />
  }, [routes, state])
  /* =^..^=  ✿  =^..^=  */
  const transform = useMemo(
    () => [
      {
        translateX: animT.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0],
        }),
      },
    ],
    [animT, width]
  )
  /* Nav animation container. */
  return (
    <Animated.View
      pointerEvents={state.isNavigating ? 'none' : 'auto'}
      style={{
        height: '100%',
        width: '100%',
        opacity: animO,
        transform,
      }}
    >
      {CurrentView}
    </Animated.View>
  )
}
