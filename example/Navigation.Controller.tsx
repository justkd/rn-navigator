import { type ComponentType, useReducer, useEffect } from 'react'
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

  const navigate = (to: string) => {
    dispatch({
      type: 'navigate',
      to,
    })
  }

  // const to: () => RouteKeys = () => {
  //   const entries = Object.entries(Routes).map(([k]) => [k, k])
  //   return Object.fromEntries(entries)
  // }

  const get = () => ({ ...state })

  return {
    navigate,
    // to,
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
    console.log('init NavigationController')
    dispatch({
      type: 'init',
      routes,
      initialRoute,
    })
  }, [initialRoute, routes, state])

  function handleNavigation(to: string) {
    dispatch({
      type: 'navigate',
      to,
    })
  }

  function getState() {
    console.log(state)
  }

  function getRoutes() {
    console.log(getRoutes())
  }

  console.log('render NavigationController')

  return (
    <View>
      <Pressable
        onPress={() => {
          handleNavigation('/One')
        }}
      >
        <Text>navigate</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          getState()
        }}
      >
        <Text>check</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          getRoutes()
        }}
      >
        <Text>routes</Text>
      </Pressable>
    </View>
  )
}
