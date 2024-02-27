import { useMemo, type ComponentType } from 'react'
import { Animated, useWindowDimensions } from 'react-native'
import { NavigationErrorView } from '../Navigation.ErrorView'
import { type NavigationState } from '../Navigation.types'

export function AnimatedContainer<
  UserRouteKey extends number | string | symbol,
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
  /* Nav animation container. */
  return (
    <Animated.View
      style={{
        height: '100%',
        width: '100%',
        opacity: animO,
        transform: [
          {
            translateX: animT.interpolate({
              inputRange: [0, 1],
              outputRange: [width, 0],
            }),
          },
        ],
      }}
    >
      {CurrentView}
    </Animated.View>
  )
}
