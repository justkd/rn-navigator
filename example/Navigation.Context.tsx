import { useReducer } from 'react'
import { Pressable, Text, View } from 'react-native'

type NavigationState = {
  current: string
  next: string
  payload: any
}

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
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}

const initialState: NavigationState = {
  current: '/Home',
  next: '',
  payload: null,
}

const useNavigation = () => {
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

  const get = () => ({ ...state })

  return {
    navigate,
    get,
  }
}

export default function NavigationController(props: {
  routes: any
}) {
  const { routes } = props
  const { navigate, get } = useNavigation()

  function handleNavigation(to: string) {
    navigate(to)
  }

  function check() {
    console.log(get())
  }

  function getRoutes() {
    return routes
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
          check()
        }}
      >
        <Text>check</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log(getRoutes())
        }}
      >
        <Text>routes</Text>
      </Pressable>
    </View>
  )
}
