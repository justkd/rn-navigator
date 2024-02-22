import type {
  NavigationState,
  NavigationEvent,
} from './Navigation.types'

export function navigationReducer(
  state: NavigationState,
  action: {
    type: string
    payload?: string | NavigationEvent
  },
) {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        queue: [{ to: action.payload as string }],
      }
    }
    case 'navigate': {
      const event =
        action?.payload && typeof action?.payload !== 'string'
          ? action?.payload
          : null
      const background =
        typeof action.payload !== 'string'
          ? action.payload?.background
          : undefined
      return event
        ? {
            ...state,
            background,
            queue: [...state.queue, event],
          }
        : state
    }
    case 'go_back': {
      if (!state.history.length) {
        const queue = [...state.queue]
        queue.pop()
        return {
          ...state,
          queue,
        }
      }
      const history = [...state.history]
      const prev = history.pop()
      const queue: NavigationEvent[] = prev
        ? [prev]
        : [...state.queue]
      return {
        ...state,
        queue,
        history,
      }
    }
    case 'go_forward': {
      const queue = [...state.queue]
      const event = [queue.shift()] as NavigationEvent[]
      const history = event.length
        ? [...state.history, ...event]
        : [...state.history]
      return {
        ...state,
        queue,
        history,
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}
