import { useReducer } from 'react'

type NavigationState = {
  current: string
  next: string
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

export default function App() {
  const { navigate, get } = useNavigation()

  function handleNavigation(to: string) {
    navigate(to)
  }

  function check() {
    console.log(get())
  }

  console.log('render App')

  return <h1>Prague itinerary</h1>
}
