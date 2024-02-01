import {
  useCallback,
  createContext,
  useContext,
  PropsWithChildren,
} from 'react'
import { type RouteKey, Routes } from './Navigation.Routes'

type Action = {
  type: string
  to: RouteKey
}

function getNavigationReducer(initialRoute: RouteKey) {
  function navigationReducer(state, action: Action) {
    switch (action.type) {
      case 'navigate': {
        return {
          ...state,
          next: Routes[action.to],
        }
      }
      // case 'changed': {
      //   return tasks.map((t) => {
      //     if (t.id === action.task.id) {
      //       return action.task
      //     }
      //     return t
      //   })
      // }
      // case 'deleted': {
      //   return tasks.filter((t) => t.id !== action.id)
      // }
      default: {
        throw Error(`Unknown action: ${action.type}`)
      }
    }
  }
  return navigationReducer
}

type ContextType = ReturnType<typeof getNavigationReducer> | null
const NavigationContext = createContext<ContextType>(null)

export function useNavigationContext() {
  return useContext(NavigationContext)
}

export function useNavigationContextProvider(
  initialRoute: RouteKey,
) {
  return useCallback(
    ({ children }: PropsWithChildren) => (
      <NavigationContext.Provider
        value={getNavigationReducer(initialRoute)}
      >
        {children}
      </NavigationContext.Provider>
    ),
    [initialRoute],
  )
}
