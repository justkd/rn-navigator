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
            payload: event.payload?.opts?.payload ?? null,
          }
        : state
    }
    case 'shift': {
      const queue = [...state.queue]
      queue.shift()
      return {
        ...state,
        queue,
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}
