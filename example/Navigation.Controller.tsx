import {
  type ComponentType,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { Pressable, Text, View } from 'react-native'

type NavigationState = {
  current: string
  next: string
  payload: any
  routes: Record<string, ComponentType>
}

/* ************************************ */

function navigationReducer(
  state: NavigationState,
  action: { type: string } & Record<string, any>,
) {
  switch (action.type) {
    case 'navigate': {
      console.log('reducer navigate', action)
      return {
        ...state,
        next: action.to,
      }
    }
    case 'init': {
      return {
        ...state,
        current: action.initialRoute,
        routes: action.routes,
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}

const initialState: NavigationState = {
  current: '',
  next: '',
  payload: null,
  routes: {},
}

/* ************************************ */

export const useNavigation = () => {
  const [state, dispatch] = useReducer(
    navigationReducer,
    initialState,
  )

  const navigate = useCallback((to: string) => {
    console.log('navigate', to)
    dispatch({
      type: 'navigate',
      to,
    })
  }, [])

  const to: Record<string, string> = useMemo(() => {
    console.log('to', state)
    const { routes } = state
    const entries = Object.entries(routes).map(([k]) => [k, k])
    console.log(entries)
    return Object.fromEntries(entries)
  }, [state])

  const get = useCallback(() => ({ ...state }), [state])
  console.log('useNavigation')
  return {
    navigate,
    to,
    get,
  }
}

/* ************************************ */

export function NavigationController(props: {
  routes: any
  initialRoute: string
}) {
  const { routes, initialRoute } = props

  const [state, dispatch] = useReducer(
    navigationReducer,
    initialState,
  )

  useEffect(() => {
    if (state.current) return
    console.log('init NavigationController', routes)
    dispatch({
      type: 'init',
      routes,
      initialRoute,
    })
  }, [initialRoute, routes, state])

  const CurrentView = useMemo(() => {
    const Current = routes[state.current]
    return Current ? <Current /> : null
  }, [routes, state])

  // useEffect(() => {
  //   console.log(state)
  // }, [state])

  console.log('render NavigationController')

  return CurrentView
  // return (
  //   <View>
  //     <Pressable
  //       onPress={() => {
  //         handleNavigation('/One')
  //       }}
  //     >
  //       <Text>navigate</Text>
  //     </Pressable>
  //     <Pressable
  //       onPress={() => {
  //         getState()
  //       }}
  //     >
  //       <Text>check</Text>
  //     </Pressable>
  //     <Pressable
  //       onPress={() => {
  //         getRoutes()
  //       }}
  //     >
  //       <Text>routes</Text>
  //     </Pressable>
  //   </View>
  // )
}
