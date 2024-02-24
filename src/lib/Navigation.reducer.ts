import {
  type NavigationState,
  type NavigationEvent,
} from './Navigation.types'

export function navigationReducer(
  state: NavigationState,
  action: {
    type: string
    event?: string | NavigationEvent
  },
) {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        queue: [{ to: action.event as string }],
      }
    }
    case 'navigate': {
      const event =
        action?.event && typeof action?.event !== 'string'
          ? action?.event
          : null
      const background =
        typeof action.event !== 'string'
          ? action.event?.background
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
